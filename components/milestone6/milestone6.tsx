import Competitors from "./competitors";
import MarketValueAndShare from "./MarketValueAndShare";
import PotentialMarketShare from "./PotentialMarketShare";
import TargetMarketSize from "./targetMarketSize";

const Milestone6 = () => {
  return (
    <div className="space-y-6">
      <TargetMarketSize />
      <Competitors />
      <PotentialMarketShare />
      <MarketValueAndShare />
    </div>
  );
};

export default Milestone6;
