import LayoutMain from '@/components/Layouts/LayoutMain'
import React from "react";
import PostGeneration from '@/components/Content/PostGeneration';

function Tools() {

  return (
    <div>
      <PostGeneration />
    </div>
  );
}

Tools.getLayout = (page: any) => {
  return <LayoutMain
    title="Post Generation Workflow"  
    description="Use Our tools to generate the perfect copy that fits your campaigns, landing pages, blog posts and more"
  >
    {page}
  </LayoutMain>
}

export default Tools