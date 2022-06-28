export const commonStyles = (loading: any) => {
  return {
    borderColor: !loading ? "#1976d2 !important" : "grey !important",
    border: 2,
    borderRadius: "16px",
    overflowY:"scroll"
  };
};
