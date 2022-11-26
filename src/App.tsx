import { BrowserRouter } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { QueryClient, QueryClientProvider } from "react-query";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, createTheme } from "baseui";
import { ToasterContainer } from "baseui/toast";
import Routes from "./routes/index";
import { ErrorBoundary } from "./errorBoundary";
import "./App.css";

const queryClient = new QueryClient();

const engine = new Styletron({
  prefix: "pb-",
});
const primitives = {
  primary: "#254f95",
  primary700: "#162f58",
};
const overrides = {
  colors: {
    primary: primitives.primary,
    primary700: primitives.primary700,
  },
};
export const MyApp = createTheme(primitives, overrides);

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  //TODO make a nice error page
  return <div>error</div>;
};

const App = () => {
  const errorHandler = (error: Error, info: { componentStack: string }) => {
    console.log(error, "error");
  };
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={MyApp}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <LoadScript
              libraries={["places", "geometry", "drawing"]}
              googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
            >
              <ToasterContainer
                overrides={{ Root: { style: { zIndex: 101 } } }}
                placement={"topRight"}
              />
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={errorHandler}
              >
                <Routes />
              </ErrorBoundary>
            </LoadScript>
          </QueryClientProvider>
        </BrowserRouter>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
