// Bento card configurations for the home screen dashboard
// Note: All progress values are dynamically calculated from progress-store.
// These values serve as fallback defaults only.

export const BENTO_CARDS = [
  {
    title: "Notes",
    subtitle: "Core syntax and best",
    progress: 80,
    icon: "file-document-outline",
    color: "primary",
    tag: "80% Read",
    route: "/notes"
  },
  {
    title: "Quiz",
    subtitle: "Validate your Python",
    progress: 45,
    icon: "help-circle-outline",
    color: "tertiary",
    tag: "45% Score",
    route: "/quiz"
  },
  {
    title: "Sample Papers",
    subtitle: "Previous year questions",
    progress: 20,
    icon: "file-document-multiple",
    color: "primary-container",
    tag: "20% Done",
    route: "/sample"
  },
  {
    title: "Profile",
    subtitle: "Your progress & stats",
    progress: 60,
    icon: "account-circle",
    color: "secondary",
    tag: "60% Done",
    route: "/profile"
  }
];
