import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadVideoPage from "./views/UploadVideoPage/UploadVideoPage";
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
import MoviePage from './views/MoviePage/MoviePage'
import MovieDetail from './views/MovieDetail/MovieDetail'
import FavoritePage from './views/FavoritePage/FavoritePage'
import ChartPage from './views/ChartPage/ChartPage'
import ChartDetailPage from './views/ChartDetailPage/ChartDetailPage'
import UploadChartPage from './views/UploadChartPage/UploadChartPage'
import DFPage from './views/DFPage/DFPage'
import DFDetailPage  from './views/DFDetailPage/DFDetailPage'
import ItemSearchPage from './views/ItemSearchPage/ItemSearchPage'
import ItemDetailPage from './views/ItemDetailPage/ItemDetailPage'
import ChatbotPage from './views/WidGetPage/ChatbotPage';
import CalendarPage from './views/CalendarPage/CalendarPage'
import ChatPage from './views/ChatPage/ChatPage'
import JusikPage from './views/JusikPage/JusikPage'
import StartPage from './views/StratPage/StartPage'
import ShortUrlPage from './views/ShortUrlPage/ShortUrlPage';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
    
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(StartPage, null)} />
          {/* 유튜브 클론 */}
          <Route exact path="/LandingPage" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
          <Route exact path="/video/detail/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/video/subscription" component={Auth(SubscriptionPage, true)} />
          {/* 영화 클론 */}
          <Route exact path="/movie" component={Auth(MoviePage, null)} />
          <Route exact path="/movie/detail/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/movie/favorite" component={Auth(FavoritePage, true)} />
          <Route exact path="/chart" component={Auth(ChartPage, null)} />
          <Route exact path="/chart/upload" component={Auth(UploadChartPage, true)} />
          <Route exact path="/chart/detail/:chartId" component={Auth(ChartDetailPage, null)} />
          {/* 채팅 클론 */}
          <Route exact path="/chat" component={Auth(ChatPage, null)} />
          {/* DF 클론 */}
          <Route exact path="/dunfa" component={Auth(DFPage, null)} />
          <Route exact path="/dunfa/itemsearch" component={Auth(ItemSearchPage, null)} />
          <Route exact path="/dunfa/itemdetail/:itemId" component={Auth(ItemDetailPage, null)} />
          <Route exact path="/dunfa/detail/:serverId/:characterId" component={Auth(DFDetailPage, null)} />
          {/* 캘린더 클론 */}
          <Route exact path="/calendar" component={Auth(CalendarPage, null)} />
          {/* 주식 */}
          <Route exact path="/jusik" component={Auth( JusikPage, null)} />
          {/* NAVER API */}
          <Route exact path="/naver/url" component={Auth( ShortUrlPage, null)} />
        </Switch>
        {/* 챗봇 클론 */}
        <ChatbotPage/>
      </div>
     
      <Footer />
    </Suspense>
  );
}

export default App;
