import { useEffect, useReducer } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Product } from "../types/Product";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAILURE"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: "FETCH_REQUEST" });

    try {
      const response = await axios.get("/api/products");
      dispatch({ type: "FETCH_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({ type: "FETCH_FAILURE", payload: getError(err as ApiError) });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <Row>
        <Helmet>
          <title>Amazon</title>
        </Helmet>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
