export const getTimestamp = function(): string {
  const date = new Date();
  const pad = (n: number): string => (n < 10 ? "0" + n : n.toString());
  return `${pad(date.getDate())}/${pad(
    date.getMonth() + 1
  )}/${date.getFullYear()}, ${date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  })}`;
};
