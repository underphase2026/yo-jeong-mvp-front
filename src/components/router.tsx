import { BrowserRouter, Route, Routes } from "react-router-dom";
import GATracker from "./GATracker";
import MainPage from "./pages/main/page";
import NotFoundPage from "./pages/notfound/page";
import MobileLayout from "./layout/mobileWeb/layout";
import SurveyPage from "./pages/survey/page";
import ShopListPage from "./pages/shop/list/page";
import ShopDetailPage from "./pages/shop/detail/page";
import QuoteResultPage from "./pages/quote/result/page";
import QuotePage from "./pages/quote/page";

const Router = () => {
  return (
    <BrowserRouter>
      <GATracker />
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          {/* 메인페이지(없으면 바로 survey로 이동) */}
          <Route index element={<MainPage />} />

          {/* 사용자 분석 */}
          <Route path="survey" element={<SurveyPage />} />

          {/* 대리점 조회(가격비교) */}
          <Route path="shop">
            <Route path="list" element={<ShopListPage />} />
            <Route path="detail" element={<ShopDetailPage />} />
          </Route>

          {/* 견적서 발급 */}
          <Route path="/quote" element={<QuotePage />} />
          <Route
            path="/quote/result/:quoteCode"
            element={<QuoteResultPage />}
          />

          {/* <Route path="/login" element={<div>Login Page</div>} /> */}
        </Route>
        {/* <Route path="/login/kakao" element={<div>Login Kakao Page</div>} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
