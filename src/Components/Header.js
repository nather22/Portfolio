import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <div className="header">
      <div className="title-container">
        <h1 id="title">
          Nathan Piper <span id="title-desc">front-end web developer</span>
        </h1>
        <ul className="header-links">
            <li><a href="https://github.com/nather22" target="_blank"><img alt="github logo" src="https://img.icons8.com/ios-glyphs/120/000000/github.png" /> github</a></li>
            <li><a href="" ><img alt="linkedin logo" src="https://img.icons8.com/ios-filled/100/000000/linkedin.png" /> linkedin</a></li>
            <li><a href="" ><img alt="resume logo" src="https://img.icons8.com/ios/100/000000/open-resume.png" /> resume</a></li>
            <li><a href="" ><img alt="work briefcase logo" src="https://img.icons8.com/dotty/80/000000/briefcase.png" /> my work</a></li>
        </ul>
      </div>
      <Nav />
      <p className="scroll-down">
        scroll <span>down</span>
      </p>
    </div>
  );
}

export default Header;
