import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../Components/Navbar/AdminSidebar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";
import { Modal } from 'flowbite-react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getCategories, createCategory, editCategory, deleteCategory } from '../../Services/Raffle/categories';

interface Category {
  category_name: string;
  type: any;
  isActive: Boolean;
  image: String,
  _id?: string;
}

const Categories: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const initialValues = {
    categoryName: selectedCategory?.category_name || '',
    status: selectedCategory?.isActive ? 'active' : 'inactive',
  };

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required('Category name is required')
      .min(3, 'Category name must be at least 3 characters'),
    status: Yup.string()
      .oneOf(['active', 'inactive'], 'Invalid status'),
  });

  const handleSubmit = async (values: any) => {
    const categoryData = {
      category_name: values.categoryName,
      type: "ELECTRONICS", // Adjust this as needed
      isActive: values.status === 'active',
      image: '', // Add image logic if required
    };

    try {
      if (isNew) {
        // Create new category (no need to include _id)
        await createCategory(categoryData);
      } else if (selectedCategory && selectedCategory._id) {
        // Edit existing category, include _id
        (categoryData as any)._id = selectedCategory._id;
        await editCategory(selectedCategory._id, categoryData);
      } else {
        console.error("Category ID is missing.");
      }



      // Re-fetch categories after submit
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      // Re-fetch categories after delete
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openModal = (category?: Category) => {
    setIsOpen(true);
    setSelectedCategory(category || null);
    setIsNew(!category);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className='flex footer-manage bg-white py-5 px-10' style={{ fontFamily: "poppins, sans-serif" }}>
      <div className='hidden lg:block'>
        <AdminSidebar />
      </div>
      <Modal
        className='bg-[#160B3A]'
        dismissible
        position="center"
        show={modalIsOpen}
        onClose={closeModal}
        popup
      >
        <Modal.Header className='bg-white rounded-t-md' > <h2 className="text-xl font-semibold mb-4 pt-4 pl-9">{isNew ? "Add Category" : "Edit Category"}</h2></Modal.Header>
        <Modal.Body className=''>
          <div className="bg-white rounded-lg p-5">


            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-gray-700 mb-2">Category name:</label>
                    <Field
                      type="text"
                      id="categoryName"
                      name="categoryName"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <ErrorMessage name="categoryName" component="div" className="text-red-500 mt-1" />
                  </div>

                  {/* Always show status field */}
                  <div className="mb-6">
                    <label htmlFor="status" className="block text-gray-700 mb-2">Status:</label>
                    <Field
                      as="select"
                      id="status"
                      name="status"
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-red-500 mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ff6a78] text-white p-2 rounded"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>

          </div>
        </Modal.Body>
      </Modal>

      <div className="w-[100%] bg-[#F9F0F0] p-5 lg:w-[95%] mx-auto z-10 lg:p-10 duration-500 min-h-screen">
        <div className="w-full max-w-6xl mt-8">
          <div className='flex justify-between items-center mb-5'>
            <div className="text-2xl font-semibold mb-4">Categories</div>
            <button
              onClick={() => openModal()}
              className="mt-4 flex gap-3 items-center py-2 px-4 bg-raffles-blue text-slate-800 text-white rounded hover:bg-slate-300"
            >
              Add New
              <IoAddSharp />
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Si. No</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: any, index) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border" align='center'>{category.category_name}</td>
                  <td className={`py-2 px-4 border text-center ${category.isActive ? 'text-green-500' : 'text-red-500'}`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </td>
                  <td className="py-2 px-4 border text-center" align='center'>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => openModal(category)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(category._id)}
                    >
                      <AiFillDelete color='red' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
