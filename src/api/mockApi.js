export const fetchReport = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "Annual Report 2025",
        sections: [
          {
            id: "section-1",
            title: "Company Overview",
            content: "Our company reached new milestones this year, expanding into new markets...",
          },
          {
            id: "section-2",
            title: "Financial Performance",
            content: "We recorded a 20% increase in revenue, driven by strong demand...",
          }
        ]
      });
    }, 1000); // Simulating API delay
  });
};
