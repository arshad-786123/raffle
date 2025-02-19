import Banner from "./Banner/Banner"
import SeeAction from "./SeeAction/SeeAction"
import AutomatedDraws from "./AutomatedDraws/AutomatedDraws"
import Summaries from "./Summaries/Summaries"
import Combination from "./Combination/Combination"

const Root = ({ setAuthenticationModal, authenticationModal }: any) => {
  return (
    <>
      <Banner />
      <SeeAction />
      <AutomatedDraws/>
      <Summaries/>
      <Combination/>
    </>
  )
}

export default Root
