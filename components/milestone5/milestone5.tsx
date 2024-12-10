import LeadCollection from "@/components/milestone5/lead-collection";
import AddingAnalytics from "@/components/milestone5/adding-analytics";
import LeadCampaign from "@/components/milestone5/lead-campaign";
import ChannelComparitions from "@/components/milestone5/channels-comparitions";
import PostedContent from "@/components/milestone5/posted-content";
import Conclusions from "@/components/milestone5/conclusion";

export default function Milestone5() {
  return (
    <div className="space-y-6">
      <LeadCollection />
      <AddingAnalytics />
      <LeadCampaign />
      <ChannelComparitions />
      <PostedContent />
      <Conclusions />
    </div>
  );
}
