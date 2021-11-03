import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import List from "./List";
import QueryResult from "../QueryResult";

function ListSlider({
  title,
  description = "",
  queryInfo,
  slidePerPage,
  children,
}) {
  const { data, isLoading } = queryInfo;
  return (
    <List title={title} description={description}>
      <QueryResult data={data} loading={isLoading}>
        <Carousel
          plugins={[
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: slidePerPage,
              },
            },
          ]}
        >
          {children}
        </Carousel>
      </QueryResult>
    </List>
  );
}

export default ListSlider;
