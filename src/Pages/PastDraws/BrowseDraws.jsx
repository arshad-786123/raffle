import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css"; 

const BrowseDraws = () => {
  const [selected, setSelected] = useState(new Date());

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const draws = [
    {
      title: "Summer Sizzler 12K Prizepool!",
      reference: "20244409",
      winningTicket: 189,
      winner: "K Chau, London",
      ticketCost: "£ 15.78",
      date: "2024-12-02",
    },
    {
      title: "Win a brand new car",
      reference: "20244409",
      winningTicket: 190,
      winner: "S Smith, London",
      ticketCost: "£ 20.50",
      date: "2024-12-02",
    },
    {
      title: "Holiday Giveaway",
      reference: "20244410",
      winningTicket: 191,
      winner: "J Doe, Manchester",
      ticketCost: "£ 5.25",
      date: "2024-11-29",
    },
    {
      title: "Cash Prize Draw",
      reference: "20244411",
      winningTicket: 192,
      winner: "A Patel, Birmingham",
      ticketCost: "£ 10.00",
      date: "2024-12-01",
    },
    {
      title: "Tech Gadget Bonanza",
      reference: "20244412",
      winningTicket: 193,
      winner: "L Brown, Glasgow",
      ticketCost: "£ 30.00",
      date: "2024-12-03",
    },
    {
      title: "Luxury Home Appliances",
      reference: "20244413",
      winningTicket: 194,
      winner: "M Williams, Leeds",
      ticketCost: "£ 25.00",
      date: "2024-11-28",
    },
    {
      title: "Weekend Getaway",
      reference: "20244414",
      winningTicket: 195,
      winner: "F Johnson, Liverpool",
      ticketCost: "£ 10.00",
      date: "2024-11-30",
    },
    {
      title: "New Year Cash Gift",
      reference: "20244415",
      winningTicket: 196,
      winner: "P Clark, Edinburgh",
      ticketCost: "£ 50.00",
      date: "2025-01-01",
    },
    {
      title: "Holiday Essentials",
      reference: "20244416",
      winningTicket: 197,
      winner: "C Davis, Bristol",
      ticketCost: "£ 8.00",
      date: "2024-12-02",
    },
    {
      title: "Exclusive VIP Access",
      reference: "20244417",
      winningTicket: 198,
      winner: "E Moore, Cardiff",
      ticketCost: "£ 12.50",
      date: "2024-12-03",
    },
  ];

  const filteredDraws = draws.filter(
    (draw) =>
      new Date(draw.date).toLocaleDateString() === selected.toLocaleDateString()
  );
  return (
    <div className="bg-[#FFFAFD] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-4xl font-modernExtraBold text-raffles-blue">
            Browse Past Draws
          </h1>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Calendar Section */}
          <div className="p-0 flex justify-center items-center">
            {/* Calendar - full width with adjusted height */}
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              styles={{
                month_caption: {
                  backgroundColor: "#ff5c7b", // Pink background
                  color: "white", // White text
                  textAlign: "center",
                  padding: "1rem",
                  borderTopLeftRadius: "11px",
                  borderTopRightRadius: "11px",
                },
                weekdays: { backgroundColor: "#ffeef1", color: "#333" },
                month_grid: { backgroundColor: "#FFFFFF" },
                root: {
                  "--rdp-day-width": "4rem", // Set day width
                  "--rdp-day-height": "5rem", // Set day height
                  "--rdp-today-color": "#110044", // Today's day color
                  "--rdp-selected-border": "2px solid #FF7485", // Selected date border
                  "--rdp-accent-color": "#FFF", // Selected date text color
                  "--rdp-accent-background-color": "#FF7485", // Selected date background
                  "--rdp-range_end-date-background-color": "#FF7485", // End range color
                  "--rdp-week_number-border": "#FF7485", // End range color
                  "--rdp-weekday-background-color": "#ffeef1",
                },
              }}
              // modifiersStyles={{
              //   selected: {
              //     color: "white",
              //   },
              // }}
            />
          </div>

          {/* Right Panel - Draw Cards */}
          <div className="space-y-6">
            {/* Button Section */}
            <button className="bg-[#FF73851A] w-full text-[#FF7485] py-2 px-6 rounded-md text-base font-modernExtraBold">
              Total {filteredDraws.length} Draws for {formatDate(selected)}
            </button>

            {/* Card Section with Scroll */}
            <div className="h-[450px] overflow-y-auto space-y-6">
              {filteredDraws.map((draw, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg lg:text-xl font-modernExtraBold text-raffles-blue mb-4">
                    {draw.title}
                  </h4>
                  <hr className="col-span-12 w-full bg-gray-300 h-[1px] my-4"></hr>

                  {/* Displaying each field with label on top and value below */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex flex-col">
                      <span className="font-sm text-raffles-blue">
                        Reference
                      </span>
                      <span className="text-lg text-raffles-light-blue">
                        {draw.reference}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sm text-raffles-blue">Winner</span>
                      <span className="text-lg text-raffles-light-blue">
                        {draw.winner}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sm text-raffles-blue">
                        Winning Ticket
                      </span>
                      <span className="text-lg text-raffles-light-blue">
                        {draw.winningTicket}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sm text-raffles-blue">
                        Ticket Cost
                      </span>
                      <span className="text-lg text-raffles-light-blue">
                        {draw.ticketCost}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDraws;
