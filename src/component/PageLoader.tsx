import { CircularProgress } from "@mui/material";

function PageLoader() {
  return (
    <div style={{
          width: "100vw",
          height: "80vh",
        }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    </div>
  );
}

export default PageLoader;
