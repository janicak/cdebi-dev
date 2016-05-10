// you can add any STATIC data you want here
import pkg from "../../package.json"

export default {
  pkg,
  // you can add any DYNAMIC data you need here
  // ...
  pageOrder: [
    {
      filename: "index.md",
      title: "Introduction",
    },
    {
      section: "Research",
      children: [
        {
          filename: "research/overview.md",
          title: "Overview",
        },
        {
          filename: "research/research-themes.md",
          title: "Research Themes",
        },
        {
          filename: "research/field-sites.md",
          title: "Field Sites",
        },
        {
          filename: "research/facilities-equipment-technology.md",
          title: "Facilities, Equipment & Technology",
        },
        {
          section: "Research Support",
          children: [
            {
              filename: "research/funded-projects.md",
              title: "Funded Projects",
            },
            {
              filename: "research/research-grants.md",
              title: "Research Grant Program",
            },
            {
              filename: "research/research-fellowships.md",
              title: "Graduate & Postdoctoral Fellowship Program",
            },
            {
              filename: "research/research-travel-exchange.md",
              title: "Research & Travel Exchange Program",
            },
            {
              filename: "research/grant-programs-faq.md",
              title: "Grant Programs FAQ",
            },
            {
              filename: "research/bioinformatic-support.md",
              title: "Bioinformatic Support",
            },
          ],
        },
      ],
    },
    {
      section: "Education Outreach & Diversity",
      children: [
        {
          filename: "education/overview.md",
          title: "Overview",
        },
        {
          filename: "education/for-teachers.md",
          title: "For Teachers",
        },
        {
          filename: "education/for-high-school-students.md",
          title: "For High School Students",
        },
        {
          section: "For Undergraduates",
          children: [
            {
              filename: "education/undergraduates/overview.md",
              title: "Overview",
            },
            {
              filename: "education/undergraduates/gem.md",
              title: "GEM Summer Course",
            },
            {
              filename: "education/undergraduates/c4-reu.md",
              title: "C4 Research Experience",
            },
            {
              filename: "education/undergraduates/cc-rise.md",
              title: "CC-RISE Research Internship",
            },{
              filename: "education/undergraduates/ggure.md",
              title: "GGURE Research Experience",
            },
            {
              filename: "education/undergraduates/partners.md",
              title: "Partnering Organizations",
            },
          ],
        },
        {
          filename: "education/for-graduates-and-postdocs.md",
          title: "For Graduate Students & Postdoctorals",
        },
        {
          filename: "education/for-everyone.md",
          title: "For Everyone",
        },
        {
          filename: "education/grants.md",
          title: "Education Grants",
        },
      ],
    },
    {
      section: "Community",
      children: [
        {
          filename: "community/people.md",
          title: "People",
        },
        {
          filename: "community/meetings-workshops.md",
          title: "Meetings & Workshops",
        },
        {
          filename: "community/nss.md",
          title: "Networked Speaker Series",
        },
        {
          filename: "community/iodp-primer.md",
          title: "How to Get Involved with the IODP",
        },
        {
          filename: "community/mailing.md",
          title: "Mailing List & Newsletter",
        },
      ],
    },
    {
      section: "Documents & Media",
      children: [
        {
          filename: "resources/scientific-publications.md",
          title: "Scientific Publications & Reports",
        },
        {
          filename: "resources/general-publications.md",
          title: "General Publications & Media",
        },
        {
          filename: "resources/data.md",
          title: "Data Access",
        },
        {
          filename: "resources/ethics.md",
          title: "Ethics Policy",
        },
        {
          filename: "resources/executive-documents.md",
          title: "Executive Documents",
        },
        {
          filename: "resources/branded-resources.md",
          title: "Branded Resources",
        },
      ],
    },
    {
      filename: "support.md",
      title: "Support C-DEBI",
    },
    {
      filename: "contact.md",
      title: "Contact Us",
    },
  ],
}
