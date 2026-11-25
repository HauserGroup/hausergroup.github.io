export const groupEmail = "alexander.hauser@sund.ku.dk";
export const emailLink = (subject: string) =>
  "mailto:" + groupEmail + "?subject=" + encodeURIComponent(subject);
