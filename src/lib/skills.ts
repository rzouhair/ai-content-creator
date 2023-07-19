const user = {
  "id": "DpuMmPmiWsVRW2oArGVmGPGHTDn1",
  "firstName": "Zouhair",
  "lastName": "Rouika",
  "email": "zwrouika@gmail.com",
  "signupEntryPoint": null,
  "milestones": [
    {
      "id": "EDITOR_PRO_TIPS",
      "created_at": "2023-04-05T18:22:50.71292+00:00",
      "__typename": "userMilestones"
    }
  ],
  "workspace": {
    "locked": false,
    "firstActivated": "2023-04-05T18:06:41.25+00:00",
    "permissions": {
      "role": "admin"
    },
    "id": "761c7a88-4a14-44fc-a092-588c220503ad",
    "active": true,
    "name": "CJ",
    "domain": "",
    "billingEmail": "zwrouika@gmail.com",
    "defaultTone": null,
    "created_at": "2023-04-05T18:03:22.703813+00:00",
    "customerId": "cus_NeuV5DelRvu8QM",
    "overagePolicy": "DO_NOTHING",
    "options": null,
    "flags": {
      "docs": true,
      "PROMPT_INPUT_LIMIT": 600,
      "longformLookback": 3200,
      "commands": true,
      "unlimitedRuns": true,
      "bossModeTheme": true,
      "fromLanguage": "EN",
      "toLanguage": "EN-US",
      "recipes": false,
      "languageFormality": "default"
    },
    "project": {
      "id": "a3c97757-8ae9-4ed7-9bf5-1753179e53e8",
      "name": "Personal",
      "__typename": "projects"
    },
    "promoId": "try-it-free",
    "maxTrialLimit": null,
    "useCases": [
      "Blog posts"
    ],
    "workspaceUserCount": {
      "aggregate": {
        "count": 1,
        "__typename": "workspaceUsers_aggregate_fields"
      },
      "__typename": "workspaceUsers_aggregate"
    },
    "__typename": "workspaces",
    "age": 5,
    "subscription": {
      "id": "sub_1Mtaj4FGTemLEdoKqRH9Rcn9",
      "trialing": true,
      "paused": false,
      "pausedAt": null,
      "quantity": 50000,
      "currentPeriodStart": "2023-04-05T18:06:30+00:00",
      "currentPeriodEnd": "2023-04-10T18:06:30.000Z",
      "cancelAtPeriodEnd": true,
      "priceId": "price_1K1GuGFGTemLEdoKy9t3Rf5v",
      "product": "Boss Mode",
      "productKey": "boss-mode",
      "type": "primary",
      "label": "Boss Mode",
      "unlimited": false,
      "billingPeriod": "monthly",
      "includedSeats": 10,
      "costPerSeat": 0,
      "currentCreditCycle": {
        "startDate": "2023-04-05T18:06:30.000Z",
        "endDate": "2023-05-05T18:06:30.000Z"
      },
      "delinquent": false
    },
    "addonSubscriptions": [],
    "trial": {
      "expired": false,
      "limitReached": false,
      "end": "2023-04-10T18:06:30.000Z",
      "creditsTotal": 10000,
      "creditsRemaining": 6799
    },
    "totalWordCount": 3201,
    "settings": {
      "artEnabled": false,
      "isFreemium": false
    },
    "milestones": [
      {
        "key": "AHA_MOMENT_V1_COMPLETED",
        "completedAt": "2023-04-07T20:17:47.472+00:00"
      },
      {
        "key": "INITIAL_ACTION_WRITE_COMMAND_COMPLETED",
        "completedAt": "2023-04-09T21:20:48.3+00:00"
      },
      {
        "key": "USE_CASE_BLOG_COMPLETED",
        "completedAt": "2023-04-09T16:42:51.485+00:00"
      }
    ],
    "teamInviteId": "98e89f0c-bb09-4851-be42-dccf7e480803"
  },
  "__typename": "users",
  "pendingEmailVerification": false,
  "evid": null,
  "intercomIdentityVerificationHash": "40716e4522d91647f080769593a8b68fac1e34ab096577292bf1ee4c91044fff",
  "workspaceCount": 1
}

const skills = [
  {
    id: "3423bd2d-c9e9-4263-8835-4a9d3eca6673",
    name: "AIDA Framework",
    description:
      "Use the oldest marketing framework in the world. Attention, Interest, Desire, Action.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product name",
        required: false,
        placeholder: "Otter AI",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Generate rich notes for meetings, interviews, lectures, and other important voice conversations with Otter, your AI-powered assistant.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "aida",
    emoji: "",
    beta: false,
    tags: "Frameworks,Social Media,Ecommerce,Ads",
    hidden: false,
    updated_at: "2023-03-24T19:18:52.673141+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "e799bdff-398d-4330-83a0-fa932213cfd2",
    name: "Amazon Product Description (paragraph)",
    description: "Create compelling product descriptions for Amazon listings.",
    input_schema: [
      {
        id: "productName",
        type: "text",
        label: "Product name",
        required: true,
        placeholder: "Khombu OrthoLite X25 Insoles",
      },
      {
        id: "productBenefits",
        type: "textarea",
        label: "Key benefits/features",
        required: true,
        placeholder:
          "High rebound cushion. Eco-friendly & Sustainable. Manage Moisture. High level breathability. Antimicrobial & Light.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "amazon",
    emoji: "",
    beta: false,
    tags: "Ecommerce",
    hidden: false,
    updated_at: "2022-12-28T19:09:21.539814+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "4c41dc5a-d317-4aa9-8555-f7cd4cbb7a09",
    name: "Amazon Product Features (bullets)",
    description:
      'Create key feature and benefit bullet points for Amazon listings under the "about this item" section.',
    input_schema: [
      {
        id: "productName",
        type: "text",
        label: "Product name",
        required: true,
        placeholder: "Khombu OrthoLite X25 Insoles",
      },
      {
        id: "productInfo",
        type: "textarea",
        label: "Product info",
        required: true,
        placeholder:
          "Khombu OrthoLite X25 High-Performance Orthotic Insoles for Men - Full-Length Thin FoamShoe Inserts - Cushion, Comfort, Arch/Heel/Foot Support for Sport, Running, Work",
      },
      {
        id: "productBenefits",
        type: "text",
        label: "Key benefits/features",
        required: false,
        placeholder:
          "High rebound cushion. Eco-friendly & Sustainable. Manage Moisture. High level breathability. Antimicrobial & Light.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional. Friendly. Funny.",
      },
      {
        id: "examples",
      },
    ],
    icon: "amazon",
    emoji: "",
    beta: false,
    tags: "Ecommerce",
    hidden: false,
    updated_at: "2023-03-09T15:52:50.519111+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "93f2403d-22de-47c1-bef5-ee60169b69cd",
    name: "A Thousand Words is Worth a Picture",
    description: "Get image prompt ideas to use with Jasper Art",
    input_schema: [
      {
        id: "sourcecontent",
        type: "textarea",
        label: "Source content",
        required: true,
        placeholder:
          "The blog post, article, tweet, etc. you'd like an image for",
      },
      {
        id: "artisticvision",
        type: "text",
        label: "Artistic Vision (optional)",
        tooltip:
          "Separate languages with a comma. Do not use a space after the comma.",
        required: false,
        placeholder: "in the style a comic book",
      },
    ],
    icon: "",
    emoji: "🖼️",
    beta: true,
    tags: "",
    hidden: false,
    updated_at: "2023-02-23T06:25:21.776242+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "c05c981f-3d9a-471b-b79a-70ba944fc906",
    name: "Before-After-Bridge Framework",
    description:
      "Create marketing copy using the BAB framework. Before, After, Bridge.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Content description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "🌁",
    beta: false,
    tags: "Frameworks",
    hidden: false,
    updated_at: "2022-12-28T20:27:42.24333+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "9cc5240c-167a-4c22-9989-39e910180c6c",
    name: "Blog Post Conclusion Paragraph",
    description:
      "Wrap up your blog posts with an engaging conclusion paragraph.",
    input_schema: [
      {
        id: "blogPostMainPoints",
        type: "textarea",
        label: "What are the main points or outline of your blog post?",
        required: true,
        placeholder:
          "You need a puppy in your life. Puppies are so cute and cuddly! You will have a friend for life. Dogs make great companions!",
      },
      {
        id: "cta",
        type: "text",
        label: "Call to action",
        required: false,
        placeholder:
          "What type of dog do you have? Let me know in the comments below!",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Casual",
      },
    ],
    icon: "",
    emoji: "🏁",
    beta: false,
    tags: "Blog",
    hidden: false,
    updated_at: "2023-03-31T18:46:52.258692+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "1e3729e1-fe42-4adb-b990-ef8c369b8b06",
    name: "Blog Post Intro Paragraph",
    description:
      "Blast through writers block by letting Jasper write your opening paragraph",
    input_schema: [
      {
        id: "blogPostTitle",
        type: "text",
        label: "Blog post title",
        required: true,
        placeholder:
          "Emerging Digital Marketing Trends That You Should Pay Attention To",
      },
      {
        id: "audience",
        type: "text",
        label: "Audience",
        required: false,
        placeholder: "Marketers. Moms. Bitcoin holders.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Casual",
      },
    ],
    icon: "",
    emoji: "",
    beta: false,
    tags: "Blog",
    hidden: false,
    updated_at: "2023-03-31T18:47:18.177796+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "5428c948-4d14-4af5-990f-ea409b07602a",
    name: "Blog Post Outline",
    description:
      'Create lists and outlines for articles. Works best for "Listicle" and "How to" style blog posts or articles.',
    input_schema: [
      {
        id: "title",
        type: "text",
        label: "Blog post title/topic",
        required: true,
        placeholder:
          "Digital Marketing Trends That You Should Pay Attention To",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "",
    beta: false,
    tags: "Blog",
    hidden: false,
    updated_at: "2023-03-31T18:44:39.156835+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "92696802-85a2-4236-83da-63b0eff4b833",
    name: "Blog Post Topic Ideas",
    description:
      "Brainstorm new blog post topics that will engage readers and rank well on Google.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company name",
        required: false,
        placeholder: "Otter AI",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Generate rich notes for meetings, interviews, lectures, and other important voice conversations with Otter, your AI-powered assistant.",
      },
      {
        id: "audience",
        type: "text",
        label: "Audience",
        required: false,
        placeholder: "Marketers. Moms. Bitcoin holders.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
      {
        id: "examples",
      },
    ],
    icon: "",
    emoji: "",
    beta: false,
    tags: "Blog",
    hidden: false,
    updated_at: "2023-03-31T18:47:34.073282+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "267d377a-cf2a-4193-bfa3-6828f587947f",
    name: "Business or Product Name",
    description: "Generate a winning name for your business or product.",
    input_schema: [
      {
        id: "description",
        type: "textarea",
        label: "Tell us about your business or product",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "keywords",
        type: "text",
        label: "Keywords to include",
        required: false,
        placeholder: "ninja",
      },
    ],
    icon: "",
    emoji: "💈",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-12-07T20:55:19.062106+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "a524d926-af80-4998-8aca-19d503bae931",
    name: "Commands",
    description: "Tell Jasper exactly what to write with a command",
    input_schema: [
      {
        id: "command",
        type: "textarea",
        label: "Your command for Jasper",
        required: true,
        placeholder:
          "Write a creative story about Tobby flying to the moon in Matthew McConaughey's tone of voice",
      },
      {
        id: "content",
        type: "textarea",
        label: "Do you have any background information for Jasper?",
        useJbv: true,
        placeholder:
          "Tobby was a happy dog that loved to sneak around eating people's food",
        jbvMaxLength: 1500,
      },
    ],
    icon: "",
    emoji: "🗣️",
    beta: false,
    tags: "Social Media,Frameworks,Email,Website,Blog,Ads,Ecommerce,Google,Video,SEO,New",
    hidden: false,
    updated_at: "2023-03-20T01:57:28.073572+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "b4f3c7c9-08d7-4379-9466-236411851244",
    name: "Company Bio",
    description: "Tell your company's story with a captivating bio.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company Name",
        required: false,
        placeholder: "Proof",
      },
      {
        id: "companyInformation",
        type: "textarea",
        label: "Company information",
        required: true,
        placeholder:
          "Proof helps digital marketers boost website conversions using the power of social proof. Founded in 2017. Located in Austin TX. Software company in the digital marketing space.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "💼",
    beta: false,
    tags: "Website",
    hidden: false,
    updated_at: "2022-08-11T20:03:46.252566+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "e501f9e4-5f83-48c0-a274-9a03a9dfcf11",
    name: "Content Improver",
    description:
      "Take a piece of content and rewrite it to make it more interesting, creative, and engaging. ",
    input_schema: [
      {
        id: "blandContent",
        type: "textarea",
        label: "Content",
        required: true,
        placeholder:
          "We help agencies automate their daily tasks so they can scale better and faster with less effort.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Funny",
      },
    ],
    icon: "stars",
    emoji: "🪄",
    beta: false,
    tags: "Email,Website,Blog,Ads,Ecommerce,Social Media",
    hidden: false,
    updated_at: "2023-03-31T18:45:10.817659+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "0de2aea5-5c09-4903-866d-a4ead2c78c93",
    name: "Creative Story",
    description: "Write wildly creative stories to engage your readers.",
    input_schema: [
      {
        id: "storyPlot",
        type: "textarea",
        label: "Plot",
        required: true,
        placeholder:
          "Jane and Gerald are two mad scientists living in the Amazon Rainforest. Jane discovers a mysterious shiny object. The scientists are mesmerized and frightened.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "🦸‍♀️",
    beta: false,
    tags: "Social Media",
    hidden: false,
    updated_at: "2022-12-07T20:25:58.925688+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "c2c9f594-7dac-4271-a698-f6e198220086",
    name: "Email Subject Lines",
    description:
      "Write compelling email subject lines that get readers to open.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Conversion.ai",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
      {
        id: "emailContent",
        type: "textarea",
        label: "What is your email about?",
        required: true,
        placeholder:
          "This email is promoting the launch of our new software tool that uses AI to write high performing marketing copy. The offer is a 50% discount.",
      },
    ],
    icon: "",
    emoji: "📨",
    beta: false,
    tags: "Email",
    hidden: false,
    updated_at: "2023-02-27T21:47:15.91138+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "a8fdd2fe-31e5-47df-bcc5-28345371bb4e",
    name: "Engaging Questions",
    description:
      "Create a form to ask your audience creative questions to increase engagement.",
    input_schema: [
      {
        id: "topic",
        type: "text",
        label: "Topic",
        required: false,
        placeholder: "Bitcoin price rising",
      },
      {
        id: "Audience",
        type: "text",
        label: "Audience",
        required: false,
        placeholder: "Gold investors",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Casual",
      },
    ],
    icon: "",
    emoji: "🤔",
    beta: false,
    tags: "Social Media",
    hidden: false,
    updated_at: "2022-08-11T20:01:38.335464+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "9f9097f9-ea71-443b-acc9-2c72a3e51680",
    name: "Explain It To a Child",
    description: "Rephrase text to make it easier to read and understand.",
    input_schema: [
      {
        id: "input",
        type: "textarea",
        label: "Input text",
        required: true,
        placeholder:
          "Open houses are an excellent way to showcase your home and get it in front of as many potential buyers as possible. You'll want to do this on a day when you're sure that you will be able to have the house open for the whole time so people won't show up and there's no one around. They're also best during times when most people don't work since they might not be able to make it out if they can't take off from their jobs.",
      },
      {
        id: "grade",
        type: "text",
        label: "Output Grade level",
        required: false,
        placeholder: "8",
      },
    ],
    icon: "",
    emoji: "👶",
    beta: false,
    tags: "Blog",
    hidden: false,
    updated_at: "2023-02-27T22:01:40.319204+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "cbd5c70e-1971-4f18-8b60-b4936488c558",
    name: "Facebook Ad Headline",
    description:
      "Generate scroll-stopping headlines for your Facebook Ads to get prospects to click, and ultimately buy.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Otter AI",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Generate rich notes for meetings, interviews, lectures, and other important voice conversations with Otter, your AI-powered assistant.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional.",
      },
      {
        id: "examples",
      },
    ],
    icon: "facebook",
    emoji: "",
    beta: false,
    tags: "Ads",
    hidden: false,
    updated_at: "2022-08-01T20:27:02.662933+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "d79c5fc7-dda7-402b-acb9-99af8a884edf",
    name: "Facebook Ad Primary Text",
    description:
      'Create high converting copy for the "Primary Text" section of your Facebook ads.',
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Excited.",
      },
    ],
    icon: "facebook",
    emoji: "",
    beta: false,
    tags: "Ads",
    hidden: false,
    updated_at: "2023-03-01T22:49:58.72499+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "02c4e6cd-56e7-4d9b-a6aa-40d66cc959b7",
    name: "FAQ Generator",
    description: "Finish your blog post with some FAQs about your topic.",
    input_schema: [
      {
        id: "topic",
        type: "text",
        label: "Topic",
        required: true,
        placeholder: "Slack",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Tongue in Cheek",
      },
      {
        id: "productInfo",
        type: "text",
        label: "Number of Questions",
        required: false,
        placeholder: "8",
      },
    ],
    icon: "",
    emoji: "❓",
    beta: false,
    tags: "Blog,Website,Marketing,New,Social Media",
    hidden: false,
    updated_at: "2023-02-23T06:25:29.044217+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "4076d9ac-2e7d-4190-a12f-b5a853b17180",
    name: "Feature to Benefit",
    description: "Turn your product features into benefits that compel action.",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "We help agencies automate their daily tasks so they can scale better and faster with less effort.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "",
    beta: false,
    tags: "Website,Ecommerce,Frameworks,Email",
    hidden: false,
    updated_at: "2022-09-27T14:43:16.618256+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "e3ced2b1-dee0-4ddc-8b77-bf0a938ceef0",
    name: "Google Ads Description",
    description:
      'Create high converting copy for the "Description" section of your Google Ads.',
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional.",
      },
      {
        id: "examples",
      },
    ],
    icon: "google",
    emoji: "",
    beta: false,
    tags: "Ads,Google",
    hidden: false,
    updated_at: "2022-12-28T17:35:14.245632+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "acc983cf-506c-4448-8aa1-7c5b43ea9977",
    name: "Google Ads Headline",
    description:
      'Create high converting copy for the "Headlines" section of your Google Ads.',
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Friendly.",
      },
      {
        id: "examples",
      },
    ],
    icon: "google",
    emoji: "",
    beta: false,
    tags: "Ads,Google",
    hidden: false,
    updated_at: "2022-09-22T19:57:45.748681+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "9dff9eca-496a-4fad-8d93-ed5490f4f939",
    name: "Google My Business - Event Post",
    description:
      "Generate event details for your Google My Business event posts",
    input_schema: [
      {
        id: "eventInformation",
        type: "textarea",
        label: "Tell us about your event",
        required: true,
        placeholder:
          "Yoga class on our outdoor patio. Free pint of beer and socializing afterward. Saturday Mar 27th 5-9pm.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional.",
      },
    ],
    icon: "google",
    emoji: "",
    beta: false,
    tags: "Google",
    hidden: false,
    updated_at: "2022-08-11T20:02:47.594407+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "ffde818d-4c7e-42a4-9339-65e66a5d5714",
    name: "Google My Business - Offer Post",
    description:
      "Generate offer details for your Google My Business offer posts",
    input_schema: [
      {
        id: "description",
        type: "textarea",
        label: "Tell us about your offer",
        required: true,
        placeholder: "Free teeth cleaning for new patients",
      },
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Daisy Dental",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional.",
      },
    ],
    icon: "google",
    emoji: "",
    beta: false,
    tags: "Google",
    hidden: false,
    updated_at: "2022-08-11T20:02:33.713898+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "885522f1-d515-417e-9bc0-b745c14f8658",
    name: "Google My Business - Product Description",
    description: "Generate product descriptions for your Google My Business",
    input_schema: [
      {
        id: "productName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Pushpress",
      },
      {
        id: "productInformation",
        type: "textarea",
        label: "Tell us about the product",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional.",
      },
    ],
    icon: "google",
    emoji: "",
    beta: false,
    tags: "Google",
    hidden: false,
    updated_at: "2022-08-11T20:02:09.917603+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "87b793b7-a5a3-4ca6-b0f0-7b4d3229fcc0",
    name: "Google My Business - What's New Post",
    description: "Generate What's New post updates for Google My Business",
    input_schema: [
      {
        id: "description",
        type: "textarea",
        label: "Tell us about your business update",
        required: true,
        placeholder:
          "We now offer garbage disposal repairs. We are plumbing company. Serving Austin Texas.",
      },
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Tom's plumbing",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional.",
      },
    ],
    icon: "google",
    emoji: "",
    beta: false,
    tags: "Google",
    hidden: false,
    updated_at: "2022-08-11T20:02:41.235218+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "f8949cf4-3eb3-4954-a36e-00175fbd460e",
    name: "Jasper.ai Testimonial Helper",
    description:
      "Use this template to generate testimonials for Jasper.ai. If this goes well, we'll open it up for you to collect testimonials from all of your customers.",
    input_schema: [
      {
        id: "productReview",
        type: "textarea",
        label: "What do you like about Jasper.ai?",
        required: true,
        placeholder:
          "Super easy to use. Gives me copywriting superpowers. Love the Facebook ads templates. Saves me so much time.",
      },
    ],
    icon: "",
    emoji: "😍",
    beta: true,
    tags: "",
    hidden: false,
    updated_at: "2022-08-31T15:33:26.006905+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "9b7aaa43-ea0c-4c3a-8ea5-bad378a5ba7c",
    name: "LinkedIn Single Image Ads",
    description:
      "Use Jasper with LinkedIn Single Image Ads to reach the right professional audience",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Background Info",
        required: true,
        placeholder:
          "Tell us about your company or product. Include all key details to be mentioned throughout the posts. ",
      },
      {
        id: "keywords",
        type: "text",
        label: "Intended Audience",
        required: false,
        placeholder: "Tech startups",
      },
    ],
    icon: "",
    emoji: "🧑‍💼",
    beta: true,
    tags: "Social Media,Business,Marketing,New",
    hidden: false,
    updated_at: "2023-03-21T20:06:54.472383+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "da7d88b0-f4af-436c-bab7-339f4d6588a7",
    name: "LinkedIn Text Ads",
    description:
      "Use Jasper with LinkedIn Text Ads to reach the right professional audience",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Background Info",
        required: true,
        placeholder:
          "Tell us about your company or product. Include all key details to be mentioned throughout the posts. ",
      },
      {
        id: "keywords",
        type: "text",
        label: "Intended Audience",
        required: false,
        placeholder: "Tech startups",
      },
    ],
    icon: "",
    emoji: "🧑‍💼",
    beta: true,
    tags: "Social Media,Business,Marketing,New",
    hidden: false,
    updated_at: "2023-03-21T20:06:46.890534+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "5abf8578-967d-44bb-8550-3b954b45e491",
    name: "Listicle ✨",
    description:
      "Generate a numbered list based on a topic. Perfect for filling in detail of a blog post.",
    input_schema: [
      {
        id: "topic",
        type: "text",
        label: "Topic",
        required: true,
        placeholder: "Wine regions in France",
      },
      {
        id: "count",
        type: "text",
        label: "List count",
        required: true,
        placeholder: "How many paragraphs do you want?",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Clever, casual",
      },
    ],
    icon: "",
    emoji: "📓",
    beta: false,
    tags: "New,Blog",
    hidden: false,
    updated_at: "2023-02-23T07:05:28.392756+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "8e7ec45c-0756-4ba3-bcd7-c7aa7deb32c9",
    name: "Marketing Angles",
    description:
      "Brainstorm different angles to add vibrancy to your marketing.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "📐",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-08-31T15:34:22.439174+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "df29e185-d59a-45d3-8de6-25675d3e6db5",
    name: "Mini-VSL (Video Sales Letter)",
    description:
      "Write a captivating 60-90 second script for a video that generates interest for your offer. Created by expert copywriter and inventor of the VSL, Jon Benson.",
    input_schema: [
      {
        id: "yourName",
        type: "text",
        label: "Your Name",
        required: false,
        placeholder: "Sarah",
      },
      {
        id: "companyName",
        type: "text",
        label: "Company Name",
        required: false,
        placeholder: "Shade Matcha",
      },
      {
        id: "audience",
        type: "text",
        label: "Who is your ideal buyer audience?",
        required: false,
        placeholder: "Women under 40 who drink coffee or energy drinks",
      },
      {
        id: "productBenefits",
        type: "textarea",
        label: "List your key benefits & features",
        required: false,
        placeholder: "Lasting energy and focus",
      },
      {
        id: "negativePain",
        type: "text",
        label:
          "What current pain or negative circumstance is your customer facing now?",
        required: false,
        placeholder: "Mid-day energy crash, bad gut health, etc.",
      },
      {
        id: "negativeScaryFact",
        type: "text",
        label: "What's a true negative or scary fact?",
        required: false,
        placeholder:
          "Fact: 65% of people feel anxiety after drinking energy drinks.",
      },
      {
        id: "bigIdea",
        type: "text",
        label:
          "What's the big idea in 2-3 words? What hook makes your product different?",
        required: false,
        placeholder: "Plant-Based Productivity. (Don't say your product yet)",
      },
      {
        id: "numberCustomers",
        type: "text",
        label: "Number of customers for social proof",
        required: false,
        placeholder: "50,000",
      },
      {
        id: "niche",
        type: "text",
        label: "What is your niche? A more narrow focus of your audience.",
        required: false,
        placeholder: "Students, Business Professionals, Busy Parents, etc...",
      },
      {
        id: "goal",
        type: "text",
        label: "What are customers' initial goal?",
        required: false,
        placeholder: "To feel awake with lasting energy the entire day",
      },
      {
        id: "bigGoal",
        type: "text",
        label:
          "What are customers' ultimate goal that results from the initial goal?",
        required: false,
        placeholder:
          "Crush goals at work, actively play with kids, live longer, look younger. ",
      },
      {
        id: "deliverable",
        type: "text",
        label: "How is your product delivered?",
        required: false,
        placeholder: "Tea Powder, Online Course, Digital Report, Software Tool",
      },
      {
        id: "productName",
        type: "text",
        label: "What is your product name?",
        required: false,
        placeholder: "Ceremonial Matcha, Model XYZ, etc. ",
      },
      {
        id: "productPrice",
        type: "text",
        label: "What is your product's price?",
        required: false,
        placeholder: "$49.99, $19/mo, free, etc.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Natural, Excited, Informative, etc..",
      },
    ],
    icon: "",
    emoji: "💰",
    beta: false,
    tags: "Video,",
    hidden: false,
    updated_at: "2022-10-20T17:50:16.551673+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "b5ad4903-69da-4e1d-8452-f6b68b2bad26",
    name: "One-Shot Blog Post",
    description: "Generate a full blog post with intro, body, and conclusion.",
    input_schema: [
      {
        id: "blogtopic",
        type: "textarea",
        label: "Blog Topic",
        required: true,
        placeholder: "SEO, Social Media",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional",
      },
      {
        id: "intendedaudience",
        type: "text",
        label: "Intended Audience",
        required: false,
        placeholder: "CMO's, CIO's",
      },
    ],
    icon: "",
    emoji: "⚡",
    beta: false,
    tags: "Marketing,Blog",
    hidden: false,
    updated_at: "2023-03-16T14:32:48.757989+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "dfb13a49-a05d-41cf-8ed5-8b7b4abe8d7d",
    name: "One-Shot Landing Page",
    description: "Generate a full landing page with H1, H2 and H3s.",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Background Information",
        required: true,
        placeholder:
          "New Nespresso Vertuo reviving origins pack. We partner with farmers to help restore coffee regions.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: true,
        placeholder: "Educational, Clever",
      },
    ],
    icon: "",
    emoji: "⚡️",
    beta: true,
    tags: "Website,New,SEO,Ecommerce",
    hidden: false,
    updated_at: "2023-02-23T06:22:11.750742+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "27c9770b-cbca-4ef4-a109-efc576ff9d2a",
    name: "Paragraph Generator",
    description: "Generate paragraphs that will captivate your readers.",
    input_schema: [
      {
        id: "topic",
        type: "textarea",
        label: "What is your paragraph about?",
        required: true,
        placeholder: "What are the best foods for every season?",
      },
      {
        id: "keywords",
        type: "text",
        label: "Keywords to include",
        tooltip:
          "Separate keywords with a comma. Do not use a space after the comma.",
        required: false,
        placeholder: "vegetables,healthy",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Informative",
      },
    ],
    icon: "",
    emoji: "📜",
    beta: false,
    tags: "Blog,Social Media,Website,SEO",
    hidden: false,
    updated_at: "2023-03-14T15:31:28.996822+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: true,
  },
  {
    id: "56e61c7f-f032-408b-b11d-06413dc47214",
    name: "PAS Framework",
    description:
      "Problem-Agitate-Solution. A valuable framework for creating new marketing copy ideas.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product name",
        required: false,
        placeholder: "Otter AI",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Generate rich notes for meetings, interviews, lectures, and other important voice conversations with Otter, your AI-powered assistant.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "pas",
    emoji: "",
    beta: false,
    tags: "Frameworks,Social Media,Ads,Ecommerce",
    hidden: false,
    updated_at: "2023-03-31T18:46:00.915478+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "3ea3ae92-c0fe-4b4e-b0c4-df180195bf71",
    name: "Perfect Headline",
    description:
      "Trained with formulas from the world's best copywriters, this template is sure to create high-converting headlines for your business.",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "productName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Pushpress",
      },
      {
        id: "customerAvatar",
        type: "text",
        label: "Customer Avatar",
        required: false,
        placeholder: "Gym Owners",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Funny.",
      },
    ],
    icon: "headline",
    emoji: "",
    beta: false,
    tags: "Website",
    hidden: false,
    updated_at: "2023-02-27T22:08:02.128459+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "2b38fa60-e113-4e82-9c85-0f9e179d80b3",
    name: "Personal Bio",
    description: "Write a creative personal bio that captures attention.",
    input_schema: [
      {
        id: "personalInformation",
        type: "textarea",
        label: "Personal Information",
        required: true,
        placeholder:
          "Dave Rogenmoser. CEO of Conversion.ai. CEO of Proof. Y Combinator 2018. Play basketball. 3 boys and a lovely wife. Love reading books of crazy survival stories. Extremely tall.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
      {
        id: "pointOfView",
        type: "text",
        label: "Point of view (First Person or Third Person)",
        required: false,
        placeholder: "Third person",
      },
    ],
    icon: "",
    emoji: "👩‍💻",
    beta: false,
    tags: "Social Media",
    hidden: false,
    updated_at: "2022-10-17T21:19:23.641324+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "19dfddcd-d7ca-4e1f-b99a-da00a7061361",
    name: "Personalized Cold Emails",
    description: "Write cold emails that actually work and get responses.",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Tell us about your product",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "productName",
        type: "text",
        label: "Your Company/Product Name",
        required: false,
        placeholder: "Pushpress",
      },
      {
        id: "emailReplyInstructions",
        type: "text",
        label: "Context to include in the email",
        required: false,
        placeholder: "I saw that you own a gym in Austin TX",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "📨",
    beta: false,
    tags: "Email",
    hidden: false,
    updated_at: "2022-07-28T20:54:43.847881+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "c912b9e4-707a-4861-9557-0e152d8bf806",
    name: "Personal LinkedIn Post",
    description:
      "Stand out from the crowd with creative, long LinkedIn posts. Build your brand, own your voice and engage your audience. ",
    input_schema: [
      {
        id: "companyName",
        type: "textarea",
        label: "Problem",
        required: true,
        placeholder: "Marketers are stuck. They can't be financially free. ",
      },
      {
        id: "productName",
        type: "textarea",
        label: "Solution",
        required: true,
        placeholder:
          "Reverse your thinking. Offer a service, productize that service as a consultant, turn that into a digital product, offer a starter option, and then turn that into a workshop. ",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Other Information",
        required: true,
        placeholder:
          "The process took me 5 years but was worth it. Don't exhaust demand by trying to make a cheap product first and then scale up.",
      },
      {
        id: "keywords",
        type: "text",
        label: "Intended Audience",
        required: true,
        placeholder: "Millennial Marketer",
      },
      {
        id: "topic",
        type: "text",
        label: "CTA",
        required: true,
        placeholder: "Think most people can do this? Leave a comment below. 👇",
      },
    ],
    icon: "",
    emoji: "🔗",
    beta: false,
    tags: "New,Social Media,Marketing,Website",
    hidden: false,
    updated_at: "2023-02-08T22:21:12.381649+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "8f9f9b6d-92db-4120-9e57-00489762e41b",
    name: "Persuasive Bullet Points",
    description:
      "Generate persuasive bullet points to insert into landing pages, emails, and more.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "⚫",
    beta: false,
    tags: "Email,Website",
    hidden: false,
    updated_at: "2022-08-31T15:34:16.217092+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "2b5cce23-9b36-4b05-b211-8a66e6895bf7",
    name: "Photo Post Captions",
    description: "Write catchy captions for your Instagram posts",
    input_schema: [
      {
        id: "postTopic",
        type: "textarea",
        label: "What is your post about?",
        required: true,
        placeholder: "Traveling to South Africa to see some Rhinos on a Safari",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "instagram",
    emoji: "",
    beta: false,
    tags: "Social Media",
    hidden: false,
    updated_at: "2023-03-31T18:49:56.333679+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "f9ba1225-1d40-4f02-91fd-8392126538ff",
    name: "Pinterest Pin Title & Description",
    description:
      "Create great Pinterest pin titles and descriptions that drive engagement, traffic, and reach.",
    input_schema: [
      {
        id: "productInformation",
        type: "textarea",
        label: "Tell us about the pin",
        required: true,
        placeholder: "Cutest tiny homes that are affordable",
      },
      {
        id: "keyword",
        type: "text",
        label: "Keywords",
        placeholder: "tiny homes",
      },
      {
        id: "productName",
        type: "text",
        label: "Company/Product Name",
        placeholder: "Home Away",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional",
      },
    ],
    icon: "",
    emoji: "",
    beta: false,
    tags: "Social Media",
    hidden: false,
    updated_at: "2022-08-11T20:02:02.191417+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "2855af09-8d02-44e5-b923-5d0d591722a5",
    name: "Poll Questions & Multiple Choice Answers",
    description:
      "Engage your community and get to know them on a deeper level. Create questions with multiple choice answers.",
    input_schema: [
      {
        id: "topic",
        type: "text",
        label: "Topic",
        required: false,
        placeholder: "Bitcoin price rising",
      },
      {
        id: "Audience",
        type: "text",
        label: "Audience",
        required: false,
        placeholder: "Gold investors",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Casual",
      },
    ],
    icon: "",
    emoji: "🗳",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-08-11T20:01:30.251621+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "13811b1d-30fb-4ba3-a3bd-a23fbbf278c3",
    name: "Press Release",
    description:
      "Inform your audience of your recent updates and news. Include all facts and quotes you want Jasper to reference. ",
    input_schema: [
      {
        id: "topic",
        type: "text",
        label: "Whats your press release about?",
        required: true,
        placeholder:
          "Happsy is Making Organic Mattresses Accessible for Everyone",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Facts + Quotes to Include",
        required: true,
        placeholder:
          'First organic bed-in-a-box, our mission is to make healthier mattresses more affordable. We are celebrating becoming 100% climate neutral certified and joining the conservation alliance. "Happsy was started to make organic, healthier, non-toxic mattresses more accessible to more people" - Dale Luckwitz, Brand Manager at Happsy.',
      },
    ],
    icon: "",
    emoji: "📰",
    beta: false,
    tags: "Marketing,New,Website,Email",
    hidden: false,
    updated_at: "2023-02-24T20:16:16.923271+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "4e2f87a9-1263-4591-8dbb-60edfd22ab05",
    name: "Press Release Title & Intro",
    description:
      "Write the opening paragraph of a press release that people will actually want to read.",
    input_schema: [
      {
        id: "blandContent",
        type: "textarea",
        label: "What is your Press Release about?",
        required: true,
        placeholder:
          "Conversion AI launches new product called Long Form Assistant. Instantly generate high quality long form copy for blogs using AI.",
      },
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Conversion AI",
      },
      {
        id: "keyword",
        type: "text",
        label: "keyword",
        required: false,
        placeholder: "artificial intelligence",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional",
      },
    ],
    icon: "",
    emoji: "📰",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-08-11T20:01:45.869049+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "7c7d6c03-e535-45d8-a8b2-bb50d71d5f07",
    name: "Product Description",
    description:
      "Create compelling product descriptions to be used on websites, emails and social media.",
    input_schema: [
      {
        id: "productName",
        type: "text",
        label: "Product Name",
        required: true,
        placeholder: "Sherlock Holmes Adventure Escape Room",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Tell us about the product",
        required: true,
        placeholder:
          "Try out a variety of options, including product spec lists",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice or brand style",
        required: false,
        placeholder: "Happy Theme Park",
      },
      {
        id: "audience",
        type: "text",
        label: "Target audience",
        required: false,
        placeholder: "Underdog office workers who want to change the world",
      },
    ],
    icon: "",
    emoji: "💭",
    beta: false,
    tags: "Ecommerce",
    hidden: false,
    updated_at: "2023-03-31T18:50:45.105634+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "5c09e48d-3517-46d2-b06e-d38bd5071696",
    name: "Quora Answers",
    description: "Intelligent answers for tough questions.",
    input_schema: [
      {
        id: "question",
        type: "textarea",
        label: "Question",
        required: true,
        placeholder: "What are some realistic ways to get rich in 5 years?",
      },
      {
        id: "information",
        type: "text",
        label: "Information to include in the answer",
        required: false,
        placeholder: "start a business",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Casual",
      },
    ],
    icon: "",
    emoji: "🙋",
    beta: false,
    tags: "Social Media",
    hidden: false,
    updated_at: "2023-03-31T18:51:21.470935+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "8b85ad74-ff44-48b9-bbda-725c8dcd8b37",
    name: "Real Estate Listing - Residential",
    description:
      "Creative captivating real estate listings that sell homes quickly.",
    input_schema: [
      {
        id: "homeInfo",
        type: "textarea",
        label: "Information about the home to include in the listing",
        required: true,
        placeholder:
          "5 Beds. 6 Baths. Barton Creek Community. 1.1 acre lot. Huge foyer. wood floors. chef style kitchen. covered patio. fruit trees. Next to Barton Creek Golf course.",
      },
    ],
    icon: "",
    emoji: "🏡",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-12-07T20:53:00.002837+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "93dab89f-7c9d-4f7e-8d1c-abfc7cb4ed18",
    name: "Review Responder",
    description:
      "Write responses to public customer reviews that are winsome, professional, and delightful.",
    input_schema: [
      {
        id: "review",
        type: "textarea",
        label: "Customer review",
        required: true,
        placeholder: "Copy and paste the full customer review",
      },
      {
        id: "productName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Single Grain Marketing Agency",
      },
      {
        id: "name",
        type: "text",
        label: "Reviewer name",
        tooltip: "Input the headline this sub-head will go underneath.",
        required: false,
        placeholder: "Jessica",
      },
      {
        id: "stars",
        type: "text",
        label: "Star rating from reviewer (from 1-5)",
        required: false,
        placeholder: "5",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Friendly",
      },
    ],
    icon: "",
    emoji: "📣",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2023-03-01T23:05:37.731049+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "ec2bb8d1-3577-4877-9af8-7592aee37476",
    name: "Ridiculous Marketing Ideas",
    description:
      "A fun template that generates bad marketing ideas that might get you on the front page of the paper for all the wrong reasons. We are not responsible for you ending up in jail or losing all your customers if you attempt these. This is a joke.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Pushpress",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Gym software that helps gym owners manage their gym with less stress and make more money.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Professional. Friendly. Funny.",
      },
    ],
    icon: "smile",
    emoji: "",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-11-04T17:45:00.831649+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "725827a2-4814-4ee2-a1d3-d33597da2e73",
    name: "Sentence Expander",
    description:
      "Expand a short sentence or a few words into multiple sentences.",
    input_schema: [
      {
        id: "input",
        type: "textarea",
        label: "A few words or a short sentence you'd like to expand on",
        required: true,
        placeholder:
          "The key to getting good results from Jasper is to have high quality inputs.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Excited.",
      },
    ],
    icon: "expand",
    emoji: "",
    beta: false,
    tags: "",
    hidden: false,
    updated_at: "2022-12-07T20:58:45.960722+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "5ebe23a1-6f0c-4279-ac6e-5ff9f2cce0f4",
    name: "SEO - Blog Posts - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions for blog posts that will rank well on Google.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: false,
        placeholder: "Hubspot",
      },
      {
        id: "blogPostTitle",
        type: "text",
        label: "Blog post title:",
        required: true,
        placeholder: "The Who, What, Why, & How of Digital Marketing",
      },
      {
        id: "blogPostDescription",
        type: "textarea",
        label: "Blog post description:",
        required: false,
        placeholder: "Learn the basic fundamentals of digital marketing.",
      },
      {
        id: "keyword",
        type: "text",
        label: "Keyword:",
        required: false,
        placeholder: "Digital Marketing",
      },
    ],
    icon: "",
    emoji: "🔍",
    beta: false,
    tags: "SEO,Blog",
    hidden: false,
    updated_at: "2023-02-27T21:54:52.52572+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "ab319383-834f-4c5e-92d4-dc9fd60e1acb",
    name: "SEO - Homepage - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions for homepages that will rank well on Google.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Clickfunnels",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Clickfunnels helps you quickly create beautiful marketing funnels that convert your visitors into leads and then customers. ClickFunnels Is A Website And Sales Funnel Builder For Entrepreneurs.",
      },
      {
        id: "keyword",
        type: "text",
        label: "Keyword:",
        required: false,
        placeholder: "Marketing Funnel",
      },
    ],
    icon: "",
    emoji: "🔍",
    beta: false,
    tags: "SEO",
    hidden: false,
    updated_at: "2022-12-28T18:34:58.163467+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "31f8815f-25f2-4bd3-8275-c1740f79cad5",
    name: "SEO - Product Page - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions that will rank well on Google for product pages. ",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company Name",
        required: true,
        placeholder: "Anthropology",
      },
      {
        id: "productName",
        type: "text",
        label: "Product name:",
        required: true,
        placeholder: "Pilcro The Wanderer Jeans",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description:",
        required: true,
        placeholder:
          "A reimagining of our beloved Wanderer silhouette, the Denim Wanderer features an easygoing fit with subtle, well-loved touches - like this pair's subtle fading and double front button - and patch pockets aplenty. Try styling them with a ruffled blouse or buttondown for a playfully polished ensemble. 96% cotton, 3% polyester, 1% elastane. Relaxed fit. Machine wash.",
      },
      {
        id: "keywordInclude",
        type: "text",
        label: "Keyword:",
        required: false,
        placeholder: "Pilcro The Wanderer Jeans",
      },
    ],
    icon: "",
    emoji: "🔍",
    beta: false,
    tags: "SEO,Ecommerce",
    hidden: false,
    updated_at: "2022-12-28T18:14:55.462273+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "bcbd0d69-3efe-4d29-8e26-309a6b55b494",
    name: "SEO - Services Pages - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions that will rank well on Google for company services pages.",
    input_schema: [
      {
        id: "companyName",
        type: "text",
        label: "Company Name",
        required: true,
        placeholder: "Bert Roofing",
      },
      {
        id: "descriptionOfService",
        type: "textarea",
        label: "Description of Service:",
        required: true,
        placeholder: "Roof Repair in Dallas Texas.",
      },
      {
        id: "keywordInclude",
        type: "text",
        label: "Keyword:",
        required: false,
        placeholder: "Roof Repair",
      },
    ],
    icon: "",
    emoji: "🔍",
    beta: false,
    tags: "SEO",
    hidden: false,
    updated_at: "2022-12-28T18:52:16.675468+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "9d8b6018-e544-4ba5-832b-47ee6313b544",
    name: "Text Summarizer",
    description: "Get the key points from a piece of text.",
    input_schema: [
      {
        id: "blandContent",
        type: "textarea",
        label: "Text",
        required: true,
        placeholder:
          "This AI is freaking incredible. Writing content for my company used to take hours and my brain would be mush at the end of each day. With conversion.ai, I can spark creativity at any point in the day - whether I'm building out trainings, copywriting for social media, or creating books for lead generation. My only wish is that I could have met Jarvis (the AI's name) sooner! I have shown a brief glimpse at what the AI does to other friends of mine in business and they were shocked just with one tool - BUT the team is constantly expanding the types of content that the AI produces.",
      },
    ],
    icon: "",
    emoji: "🧙",
    beta: false,
    tags: "Social Media,Website,Blog",
    hidden: false,
    updated_at: "2022-09-27T16:34:12.014787+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "6ec4981b-9364-46d5-8a42-575f80fddc88",
    name: "TikTok Video Captions",
    description: "Generate viral captions for your TikTok videos.",
    input_schema: [
      {
        id: "topic",
        type: "textarea",
        label: "What is your video about?",
        required: true,
        placeholder: "Bitcoin is going to the moon",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Sarcastic",
      },
      {
        id: "keywords",
        type: "text",
        label: "Keywords to include",
        tooltip:
          "Separate keywords with a comma. Do not use a space after the comma.",
        required: false,
        placeholder: "Ethereum,Bitcoin",
      },
    ],
    icon: "",
    emoji: "🤳",
    beta: false,
    tags: "Social Media,Video,New",
    hidden: false,
    updated_at: "2023-02-08T22:22:44.661225+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "4affa710-4d6d-471a-85c0-03e2c04568f6",
    name: "Tone Detector ",
    description:
      "Discover your unique tone of voice with the help of Jasper. Simply paste previously written content in, and Jasper will tell you.\n\n",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Content Description",
        required: false,
        placeholder:
          "You only need a paragraph or two for Jasper to be able to tell you your tone of voice",
      },
    ],
    icon: "",
    emoji: "🎶",
    beta: false,
    tags: "New,Blog,Marketing,Social Media,Ecommerce,Ads,Email,Website",
    hidden: false,
    updated_at: "2023-02-23T07:05:36.521442+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "622b173f-3e6f-4e45-93e2-70ef4d92ab07",
    name: "Tweet Machine",
    description: "Generate viral tweets for Twitter.",
    input_schema: [
      {
        id: "tweet topic",
        type: "textarea",
        label: "What is your tweet about?",
        required: true,
        placeholder:
          "Updates about the James Webb telescope, our company just announced...",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice:",
        required: false,
        placeholder: "Factual yet witty",
      },
    ],
    icon: "",
    emoji: "🐥",
    beta: true,
    tags: "Social Media,New",
    hidden: false,
    updated_at: "2022-12-07T21:02:43.373816+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "aaa3d54c-396f-4294-afa5-96ff6ce21ec2",
    name: "Unique Value Propositions",
    description:
      "Create a clear statement that describes the benefit of your offer in a powerful way.",
    input_schema: [
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "We help agencies automate their daily tasks so they can scale better and faster with less effort.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "",
    emoji: "",
    beta: false,
    tags: "Website",
    hidden: false,
    updated_at: "2022-08-11T20:03:37.371315+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "5996d8b1-4e36-491c-9c9b-9a83633893a8",
    name: "Video Description - YouTube",
    description:
      "Create unique descriptions for Youtube videos that rank well in search.",
    input_schema: [
      {
        id: "videoTitle",
        type: "text",
        label: "Video title",
        required: true,
        placeholder:
          "COMPLETE Shopify Tutorial For Beginners 2020 - How To Create A Profitable Shopify Store From Scratch",
      },
      {
        id: "keyword",
        type: "text",
        label: "Keyword to rank for:",
        required: false,
        placeholder: "Shopify",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "youtube",
    emoji: "",
    beta: false,
    tags: "Video",
    hidden: false,
    updated_at: "2022-08-11T20:04:58.420332+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "9d4171bc-21f8-48b2-bf22-1cb73b854db0",
    name: "Video Script Hook and Introduction",
    description:
      "Create a video intro that will capture your viewers attention and compel them to watch all the way through.",
    input_schema: [
      {
        id: "videoTitle",
        type: "text",
        label: "Video title",
        required: true,
        placeholder:
          "COMPLETE Shopify Tutorial For Beginners 2020 - How To Create A Profitable Shopify Store From Scratch",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "youtube",
    emoji: "",
    beta: false,
    tags: "Video",
    hidden: false,
    updated_at: "2022-08-11T20:04:48.763236+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "bf370305-ba24-4965-8f23-31313e2661e3",
    name: "Video Script Outline",
    description:
      'Create script outlines for your videos. Works best for "Listicle" and "How to" style videos.',
    input_schema: [
      {
        id: "title",
        type: "text",
        label: "Video title/topic",
        required: true,
        placeholder: "8 strategies for lowering your risk of heart attack.",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "youtube",
    emoji: "",
    beta: false,
    tags: "Video",
    hidden: false,
    updated_at: "2022-08-11T20:05:06.696781+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "315351e4-77a6-4ce5-9d75-f9b3445268f8",
    name: "Video Titles",
    description:
      "Create engaging, click-worthy titles for your videos that will rank on Youtube.",
    input_schema: [
      {
        id: "videoTopic",
        type: "text",
        label: "What is the video about?",
        required: true,
        placeholder: "How  to build a Shopify business",
      },
      {
        id: "keyword",
        type: "text",
        label: "Keyword to rank for:",
        required: false,
        placeholder: "Shopify",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "youtube",
    emoji: "",
    beta: false,
    tags: "Video",
    hidden: false,
    updated_at: "2022-08-11T20:05:24.243707+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "a230b22f-2fb4-4b35-83c7-af9eb0063020",
    name: "Video Topic Ideas",
    description:
      "Brainstorm new video topics that will engage viewers and rank well on YouTube.",
    input_schema: [
      {
        id: "videoTopic",
        type: "text",
        label: "What topic should the videos be about?",
        required: true,
        placeholder: "Making homemade bread",
      },
      {
        id: "keyword",
        type: "text",
        label: "Keyword to rank for:",
        required: false,
        placeholder: "Homemade Bread",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
    ],
    icon: "youtube",
    emoji: "",
    beta: false,
    tags: "Video",
    hidden: false,
    updated_at: "2022-08-11T20:05:15.232722+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
  {
    id: "10780d17-829d-4603-9ad6-7dc554cd3a2c",
    name: "Website Sub-headline",
    description:
      "Create delightfully informative sub-headlines (H2) for your websites and landing pages.",
    input_schema: [
      {
        id: "productName",
        type: "text",
        label: "Company/Product Name",
        required: true,
        placeholder: "Single Grain",
      },
      {
        id: "productDescription",
        type: "textarea",
        label: "Product description",
        required: true,
        placeholder:
          "Single Grain is a high performance marketing agency that helps fast growing companies do PPC and SEO.",
      },
      {
        id: "headline",
        type: "text",
        label: "Headline",
        tooltip: "Input the headline this sub-head will go underneath.",
        required: false,
        placeholder: "We drive persistent growth for remarkable companies",
      },
      {
        id: "tone",
        type: "text",
        label: "Tone of voice",
        required: false,
        placeholder: "Witty",
      },
      {
        id: "examples",
        tooltip:
          "Adding 1-3 examples of quality outputs may help Jarvis produce better results.",
      },
    ],
    icon: "subheadline",
    emoji: "",
    beta: false,
    tags: "Website",
    hidden: false,
    updated_at: "2022-12-28T19:36:20.377773+00:00",
    favoriteSkills_aggregate: {
      aggregate: {
        count: 0,
      },
    },
    improved: null,
  },
];

const documents = {
  "data": {
    "documentsByWorkspaceAndProject": {
      "documents": [
        {
          "id": "c98ef044-883c-4e10-85c3-8b3708adef08",
          "name": null,
          "content": "When it comes to creating a safe environment for your cockatiel, there are a few key things you need to consider. Make sure their cage is large enough for them to move around comfortably and that it's made of high-quality, non-toxic materials. Avoid placing their cage near any potential hazards like open windows or doors, and keep any toxic plants or chemicals out of their reach.\n",
          "deletedAt": null,
          "updatedAt": "2023-04-08T06:46:56.470Z",
          "isPublic": true,
          "status": "—",
          "createdBy": {
            "id": "DpuMmPmiWsVRW2oArGVmGPGHTDn1",
            "firstName": "Zouhair",
            "lastName": "Rouika"
          },
          "project": null
        },
        {
          "id": "57865f65-c3a8-4761-aaac-c03f051407e3",
          "name": "Getting Started with Commands (~2 minutes)",
          "content": "Hello\nGetting Started with Commands (~2 minutes)\nhello\nh4\nCommands are where the magic happens! In the body of the document editor, tell Jasper what you want to write about with just a few words.\n\nRather watch a video?\n1-minute Jasper Basics video: Commands\n\nThe three steps of a command are:\n🏃‍♀️ Actions - an action verb to activate Jasper's response. (e.g. rephrase, summarize, improve content, write, explain, ask, expand)\n🏗 Structures - a defined structure for Jasper to imitate. (e.g. outline, list, website headline, ad, blog intro paragraph)\n➡️ Directions - any additional information that will help get quality outputs. (e.g. “why horses are the best pet,” “how to get to the bottom of the ocean,” “symptoms of TMJ”)\n\nHere’s what it looks like when you put it all together: \nWrite (action) a blog post intro paragraph (structure) about the benefits of organic vegetables over non-organic (direction).\n\nNow you try! Type your command below the *** and then press “Command⌘ + Enter” for a Mac or ”CTRL + Enter ” for PC to generate the content.\n\n***\n\n\n",
          "deletedAt": null,
          "updatedAt": "2023-04-08T04:17:26.181Z",
          "isPublic": true,
          "status": "—",
          "createdBy": {
            "id": "DpuMmPmiWsVRW2oArGVmGPGHTDn1",
            "firstName": "Zouhair",
            "lastName": "Rouika"
          },
          "project": null
        },
        {
          "id": "d6e3d505-56f9-4f60-ae9e-6009dd06d901",
          "name": "Recipe: Generate SEO optimized title",
          "content": ">Write an SEO-optimized title about \"The secret for taming baby cockatiels\"\n\n\"Revealing the Secret to Taming Baby Cockatiels - Tips & Tricks for Beginners\"\n\n",
          "deletedAt": null,
          "updatedAt": "2023-04-07T20:21:56.224Z",
          "isPublic": true,
          "status": "—",
          "createdBy": {
            "id": "DpuMmPmiWsVRW2oArGVmGPGHTDn1",
            "firstName": "Zouhair",
            "lastName": "Rouika"
          },
          "project": null
        },
        {
          "id": "a1003f4a-f567-458e-9c85-f1fa2cbd0834",
          "name": null,
          "content": "\nThe secret for taming baby cockatiels that you need to know\nDo you have a baby cockatiel? If so, you already know how rewarding pet ownership can be. However, it can also be challenging to successfully tame your bird. Luckily, with the right knowledge and strategies, taming a baby cockatiel is within reach! In this article, we'll offer insight into the secrets of taming and bonding with your baby bird. From establishing trust to setting appropriate boundaries for your pet, these tips will help turn your feathered friend into an obedient companion that loves spending time in your presence. Ready to start? Let's dive in and provide you with all the information needed for successful taming of a Baby Cockatiel!\n\n1. What to Expect When Taming Baby Cockatiels \nTaming baby cockatiels may at first seem like a daunting task, but done correctly, it can be a wonderful and rewarding experience.\n\nBefore getting started with taming, it is important to understand that gaining trust is paramount; your cockatiel will need time to adjust to its new home and build trust in you.\n\nOnce trust has been established, you can begin setting boundaries: decide on times when cuddles with your baby cockatiel are welcome - and also those that are not.\n\nAs the process of taming continues, you will hopefully end up butterflies away with a loving companion who will be eternally grateful for all your care and attention!\n2. Understanding Your New Bird’s Scared Nature \n3. How to Build Trust with Your Baby Cockatiel \n4. Encouraging Positive Behaviour in Your Cockatiel \n5. Establishing Rules and Boundaries with your Bird \n6. Creating a Safe Place for your Cockatiel to Relax and Unwind\n\n\n\n",
          "deletedAt": null,
          "updatedAt": "2023-04-07T17:46:24.485Z",
          "isPublic": true,
          "status": "—",
          "createdBy": {
            "id": "DpuMmPmiWsVRW2oArGVmGPGHTDn1",
            "firstName": "Zouhair",
            "lastName": "Rouika"
          },
          "project": null
        }
      ],
      "totalCount": 4
    }
  }
}

const outputs = [
  {
      "id": "251b0779-0efd-4980-97f7-1de8724abb73",
      "completionId": "cmpl-72xM3Drv4qMdgoTPgtwQQcxOohnmw",
      "text": "1.  Establish trust by offering your cockatiel a favorite treat from your hand.\n2.  Get your cockatiel used to being touched by gently stroking its head and back.\n3.  Lift your cockatiel out of the cage when it is calm and perching quietly.\n4.  Hold your cockatiel close to your body and allow it to explore its new surroundings.\n5.  Return your cockatiel to its cage when it becomes restless or agitated.",
      "translatedText": null,
      "outputWordCount": 72,
      "ts": 1680939178142
  },
  {
      "id": "8a20280b-4ee8-4226-8b84-abc488da9110",
      "completionId": "cmpl-72xM3Drv4qMdgoTPgtwQQcxOohnmw",
      "text": "1.  Don’t overcrowd the cage\nYou should avoid putting too many cockatiels in one cage as this will make it harder to tame them. If you have more than one cockatiel, make sure to give each bird its own space.\n\n2.  Let them get used to you\nBefore you start trying to tame your cockatiel, you should let the bird get used to your presence. Spend some time each day sitting near the cage and talking to the bird in a soft, calming voice. Once the cockatiel seems comfortable with you, you can begin working on taming it.\n\n3.  Start with simple tasks\nWhen you first start working on taming your cockatiel, stick to simple tasks such as getting the bird to step up onto your finger. Once your cockatiel is comfortable doing this, you can move on to more difficult tasks such as teaching it tricks or getting it to eat out of your hand.\n\n4.  Be patient\nTaming a cockatiel can take time and patience. Don’t get discouraged if your bird isn’t making progress as quickly as you’d like. Just keep working at it and eventually, you’ll be able to tame your cockatiel.\n\n5.  Get help from a professional\nIf you’re having trouble taming your cockatiel, consider getting help from a professional trainer or behaviorist. These experts can give you advice on how to best tame your bird and may even be able to do some of the work for you",
      "translatedText": null,
      "outputWordCount": 243,
      "ts": 1680939178163
  }
]

const recipes = {
  "recipes": [
    {
      "id": "1ee6c833-fa00-4017-941f-73cd854d0e4f",
      "name": "Generate SEO optimized title",
      "body": ">Write an SEO optimized title about {BLOG_POST_TITLE}",
      "public": null,
      "published": null,
      "lastUsed": "2023-04-07T20:16:54.635+00:00",
      "user": {
        "email": "zwrouika@gmail.com",
        "firstName": "Zouhair",
        "lastName": "Rouika"
      }
    }
  ],
  "featured": [
    {
      "id": "1c2a84a4-9cbf-4901-8c48-83879eabb901",
      "name": "Video Script Blueprint with Show Notes",
      "description": "This is a Video Script Blueprint with Show Notes that can be used as a blog post to drive traffic back to the video and bring in leads.  This Video Blueprint was developed after I had a video hit a reach of 1 Million Organically on Facebook. It's a part of what we call the Map to Millions. "
    },
    {
      "id": "2b3eb95c-cf63-45e1-b73f-63c677645d19",
      "name": "The Hero's Journey Outline",
      "description": "The Hero's Journey: 12 Stages of Character & Story Arc Development\n\nIn 1949, mythologist Joseph Campbell published The Hero With a Thousand Faces, which outlines the structure of the journeys that archetypal heroes experience in world myths. This structure became known as the monomyth, or Hero’s Journey, and has since served as the framework behind many popular speculative fiction books and films, including Star Wars, Harry Potter and the Sorcerer's Stone, The Hunger Games, Ender's Game, and The Lord of the Rings. \n\nThe goal of this outline is to create a sense of relatability in the hero’s story. The hero should act as a beacon of hope because of his struggles, and the transformation of the hero is what makes their story inspiring for others on a similar path.\n\nPRO TIP: The Hero’s Journey doubles as a framework for non-fiction authors, marketers, and business owners to better understand their readers and customers. In turn, this understanding helps the author or brand communicate their message more effectively by adding clarity to where their audience is now and where they want to be.\n\nALSO: Keep an open mind about the story as Jasper builds the outline. Let Jasper build the story by feeding it a short sentence in the description box to get the best results. Also, if one question in the recipe doesn't provide the desired results, it's OK to skip it!\n\nHere's a layout of each stage of The Hero's Journey with a description for your reference (not in the recipe when you download it into your account to keep it light-weight)\n\n*Please note that the hero may be referenced as a 'he' in some of the examples and explanations. When downloading the recipe into your account, you can do a quick search for pronouns and adjust them to line up with your character.\n\n1. Ordinary World\n\nBefore the present tale begins, our Hero is in his own world, oblivious to what's ahead. It's a safe place for him. This establishes our Hero as a human, just like you and me, and makes it easier for us to connect with him and therefore empathize with his problems.\n\n2. Call To Adventure\n\nThe protagonist's journey begins when he or she is called to action, such as receiving a direct danger to his or her safety, family, lifestyle, or community. It may not be as dramatic as a gunshot, but it might be just as life-changing.\n\n3. Refusal Of The Call\n\nDenying the call may be because of his fear that he will not be able to complete it. Second thoughts or even deep personal concerns about whether or not he is capable of performing the task. When this happens, the Hero refuses the offer and, as a result, suffers in some manner. The problem he faces may appear to be too difficult and the potential loss too great if he fails.\n\n4. Meeting The Mentor\n\nThe mentor figure provides the Hero with something he needs at this crucial turning point when the Hero is in need of guidance. He might be given a valuable object, knowledge into the problem he's facing, sound advice, hands-on training, or even self-confidence. Whatever the mentor gives him helps to dispel his concerns and fears while also encouraging him to continue his journey.\n\n5. Crossing The Threshold\n\nThe Hero is now prepared to act on his call to adventure and start his quest, whether it be physical, spiritual, or emotional in nature. He might go of his own accord or be forced to do so, but at last, he will cross the barrier that separates him from the world he knows. It might be leaving home for the first time in an epic journey, or it could be an internal one where he’s forced to face his inner demons.\n\n6. Tests, Allies, Enemies\n\nThe Hero is now thrust out of his comfort zone, with a more difficult series of obstacles put in his path to test him in a variety of ways. Obstacles are strewn across the Hero's route, whether they be physical impediments or persons intent on preventing him from reaching his objective.\n\nThe Hero must figure out who can be trusted and who cannot. He may come across friends and confrontations with adversaries that will, in their own ways, help him prepare for the greater challenges ahead. This is where his abilities and skills are put to the test, and every obstacle he faces helps us better understand his personality as well as connect with him on a deeper level.\n\n7. Approach To The Inmost Cave\n\nThe inside cave might represent a variety of things in the Hero's tale, including a real-life location with a deadly peril or an internal debate the Hero has yet to confront. As the Hero approaches the cave, he must make final arrangements before leaping into the vast unknown.\n\nAt the threshold to the inner cave, the Hero may once again confront some of his initial concerns and fears. To gain the bravery to continue, he may need to take some time to reflect on his trip and the hazardous road ahead. This brief repose heightens tension in anticipation of the Hero's ultimate trial by allowing us to comprehend how significant it is.\n\n8. The Ordeal\n\nThe Supreme Ordeal is a perilous physical trial or a profound inner conflict that the Hero must overcome in order to survive or for the world in which he lives to continue to exist. Whether it's defeating his most terrible adversary or his deepest dread, the Hero must utilize all of his abilities and experiences gathered on the journey to the inner cave in order to succeed.\n\nThe Hero is reborn through death, which is metaphorically likened to a literal resurrection that gives him new power or knowledge sufficient to complete his mission or reach the conclusion of his quest. This is when everything the Hero values most hangs in the balance. He will either perish or life as he knows it will never be the same again if he fails.\n\n9. The Reward\n\nThe Hero, after overcoming the enemy, surviving death, and finally conquering his greatest personal challenge, is ultimately changed into a new condition as a result of battle. The Reward may take many forms: an important or powerful object, a secret knowledge or wisdom increase, or even reconciliation with a loved one or companion. Whatever the treasure is that will help him complete his journey, the Hero is now in a better position to do so than before.\n\n10. The Road Back\n\nThis is the last part of the Hero's journey. In this section, he has to go back home with his reward. Now, instead of being afraid, he will be hoping for acclaim and vindication. He might have to do one more thing before going back into the Ordinary World.\n\n11. Resurrection\n\nThis is the climax, in which the Hero will have his last and most hazardous confrontation with death. The Hero's final contest is about more than his own existence, with the outcome having significant implications for his Ordinary World and those he leaves behind. Others will suffer if he fails, adding to the burden on his shoulders and compelling the audience to feel involved in the struggle as well. The Hero will ultimately succeed, defeat his opponent, and emerge from the conflict with the prize he set out to win.\n\n12. The Return\n\nThe final stage in the Hero's journey is his return to his Ordinary World as a transformed person. He will have developed as a person, acquired many new skills, encountered many terrible challenges, and even faced death during his quest. However, he looks forward to beginning a fresh existence at home. His return might provide renewed optimism for those he left behind and faith for those who have continued to believe in him.\n\nThe ultimate prize that he receives may be literal or figurative. It might be a cause for celebration, self-awareness, or the end of the conflict, but whatever it is, it represents three things: change, success, and proof of his journey. The Hero's doubters will be ostracized; his foes chastised; and his allies rewarded. His rewards may be material, they may take the form of a new prize or status, or he might even experience a spiritual change that was unknown to him before his journey began."
    },
    {
      "id": "1eff8cb7-6714-480b-ba20-2a270f2a965b",
      "name": "The Perfect Non-Fiction Book Introduction & Outline",
      "description": "This is a framework formulated inside The 7 Day Book Challenge and developed from countless hours of research and study of bestselling non-fiction books. This recipe can be used as the structure of your next non-fiction book and modified as you see fit.\n\nLegend:\n> = command for Jasper\n*** = stop Jasper from reading above"
    },
    {
      "id": "23b9d39f-b815-4706-90a9-9fef3f37d8cb",
      "name": "Product Review Blog Post",
      "description": "Learn how to write 10X faster product review blog posts.   \n\nIf you're looking for a way that will increase your blogging output, and make more sales from your affiliate website, then this is the right video for you.  \n\nI'll show you how to take products and turn them into an amazing product review blog post in no time flat - all in Jasper!  \n\nThe best bit? You can access the recipe (workflow) right in Jasper and run it for yourself - you don't even need to copy & paste!  \n\nWhat you need to prepare:\n\nSeed Keyword\nAudience (who is this talking to?)\n\nFor each product:\nProduct name:\nShort Description (optional - could be copied from Amazon / Manufacturer, etc.):\nFeature 1:\nFeature 2:\nFeature 3:\n\nBenefit 1:\nBenefit 2:\nBenefit 3:"
    },
    {
      "id": "e2ef862e-1b9c-462b-aa35-d61ff214bf49",
      "name": "Cold Email",
      "description": "Write the perfect cold email using the AIDA model (Attention, Interest, Desire, Action). The AIDA model has been used by salespeople since 1898 - it's time we bring this classic approach to writing cold emails."
    },
    {
      "id": "69c657f4-a185-4e31-b73f-4092cf957018",
      "name": "Blog Post",
      "description": "Whip together a quick blog post in 5 minutes using this recipe!"
    },
    {
      "id": "32b643e5-19eb-40dd-b05a-2709494d1903",
      "name": "🏭 The Idea Factory",
      "description": "Start every project off the easy way by quickly generating great ideas and angles using The Idea Factory."
    },
    {
      "id": "2b707e80-a5ab-47be-b640-dfc1a9651acf",
      "name": "Facebook Ad",
      "description": "Write a compelling Facebook Ad using the PAS framework (Problem, Agitate, Solution)."
    },
    {
      "id": "a280e5c2-5294-4edc-9594-230e61613b89",
      "name": "Rewrite / Expand Blog Posts (or other content)",
      "description": "You want to quickly rewrite or expand existing blog posts or content.  \n\nRewriting and expanding on your old blog posts can be a great way to get more traffic, build your brand, and maybe even make some extra money.  \n\nBut it’s not always easy. \n\nIn this workflow, I will show you how to take an old post of yours and turn it into something new. \n\nWe'll go through the entire process together, with a real life use case example to expand 500 words to 1500 words in just a few minutes.  \n\nDocument Setup (what you need before you start)\n\nAudience - who is this blog post / information for\nMotivation - what action are you trying to motivate them to take\nProduct / Service / Solution -  what is being offered\nOriginal content  to rewrite including H1"
    }
  ],
  "count": {
    "aggregate": {
      "count": 1
    }
  }
}

export default skills;
