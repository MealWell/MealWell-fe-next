import MVPAdmin from "./admin/MVPAdmin";
import Description from "./MVPDescription";
import MVPNutritionist from "./nutritionist/MVPNustritionist";
import MVPUser from "./user/MVPUser";

const Milestone7 = () => {
  return (
    <div className="space-y-6">
      <Description />
      <MVPAdmin />
      <MVPNutritionist />
      <MVPUser />
    </div>
  );
};

export default Milestone7;
