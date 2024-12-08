import Interviews from "@/components/milestone2/Interviews";
import IdentifyingProblem from "@/components/milestone2/IdentifyingProblem";
import Solution from "@/components/milestone2/Solution";
import CustomerDiscoveryPlan from "@/components/milestone2/CustomerDiscoveryPlan";
import DetailedCustomerDiscoveryPlan from "@/components/milestone2/DetailedCustomerDiscoveryPlan";
import Conclusions from "@/components/milestone2/Conclusions";
import CustomerValidation from "@/components/milestone2/CustomerValidation";

const Milestone2 = () => {
  return (
    <div className="space-y-6">
      <IdentifyingProblem />
      <Solution />
      <CustomerDiscoveryPlan />
      <DetailedCustomerDiscoveryPlan />
      <Interviews />
      <Conclusions />
      <CustomerValidation />
    </div>
  );
};

export default Milestone2;
