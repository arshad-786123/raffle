import React from "react";
import MoreWinners from "./MoreWinners";
import JoinWinnerClub from "../PDP/Components/JoinWinnerClub";
import FeaturePrizeWinner from "./FeaturePrizeWinner";
import RaffilyStandard from "./RaffilyStandard";

const Winner = ({ authenticationModal, setAuthenticationModal }: any) => {
    return (
        <div>
            {/* Adding new winner component here */}
            {/* <FeaturePrizeWinner/> */}
            <MoreWinners />
            <RaffilyStandard />
            <JoinWinnerClub authenticationModal={authenticationModal}
                setAuthenticationModal={setAuthenticationModal} />
        </div>
    );
};

export default Winner;
