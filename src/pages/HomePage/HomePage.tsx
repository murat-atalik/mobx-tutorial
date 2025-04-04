import { PaginatedList, SearchField } from "../../components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import image from "../../assets/backgrounds/detail.png";
import "./homePage.scss";
import { observer } from "mobx-react-lite";

export const HomePage = observer(() => {
  return (
    <div className="homepage">
      <div className="homepage__header">
        <div className="homepage__banner">
          <LazyLoadImage
            className="homepage__banner-image"
            alt={"background"}
            src={image}
          />
          <div className="homepage__banner-gradient" />
        </div>

        <div className="homepage__search">
          <SearchField />
        </div>
      </div>
      <PaginatedList />
    </div>
  );
});
