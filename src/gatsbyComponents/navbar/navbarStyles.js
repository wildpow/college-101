import styled from "styled-components";

// const NavWrapper = styled.div`
//   position: fixed;
//   width: 100%;
//   z-index: 1;
//   top: 0;
//   overflow: hidden;
//   color: #000;
//   background-color: #fff;
//   letter-spacing: 4px;
//   padding: 8px 16px;
//   box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
//   & a {

//     padding: 8px 16px;
//     float: left;
//     width: auto;
//     border: none;
//     display: block;
//     outline: 0;
//     white-space: normal;
//     text-decoration: none;
//     overflow: hidden;
//     cursor: pointer;
//     vertical-align: middle;
//     text-align: center;
//     font-family: Verdana, sans-serif;
//   }
//   overflow: hidden;
//   background-color: #333;
//   font-family: Arial, Helvetica, sans-serif;
//   & a {
//     float: left;
//     display: block;
//     color: #f2f2f2;
//     text-align: center;
//     padding: 14px 16px;
//     text-decoration: none;
//     font-size: 17px;
//   }
//   & a:hover {
//     background-color: #ddd;
//     color: black;
//   }
//   & a:active {
//     background-color: #4caf50;
//     color: white;
//   }
//   & div {
//     float: right;
//   }
// `;

// export const NavWrapper = styled.header`
//   display: flex;
//   letter-spacing: 4px;
//   box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
//   background-color: #fff;
//   /* color: #000; */
//   justify-content: space-between;
//   padding: 18px 16px;
//   position: fixed;
//   z-index: 1000;
//   width: 100%;
//   font-family: Arial, Helvetica, sans-serif;
//   & div a {
//     /* color: #f2f2f2; */
//     text-align: center;
//     padding: 12px 16px;
//     text-decoration: none;
//     font-size: 17px;
//   }
//   & div a:hover {
//     background-color: #ddd;
//     color: black;
//   }
//   & div a:active {
//     background-color: #4caf50;
//     color: white;
//   }
// `;

// export const LogoContainer = styled.div`
//   flex-basis: 20%;
//   & a {
//     /* padding: 14px 16px;
//     border: none; */
//     /* color: #f2f2f2; */
//   }
// `;

// export const RightSideNav = styled.div`
//   flex-basis: 80%;
//   text-align: right;
//   & a {
//     /* padding: 14px 16px;
//     border: none; */
//     /* color: #f2f2f2; */
//   }
// `;

export const FixedWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  z-index: 9;
  /* padding: 18px 16px; */
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  background-color: floralwhite;
  font-family: Verdana, sans-serif;
  font-variant: small-caps;
  letter-spacing: 4px;
  overflow: hidden;
`;

export const NavWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: seagreen;
  & div a {
    /* color: #f2f2f2; */
    text-align: center;
    padding: 15px 16px;
    text-decoration: none;
    font-size: 17px;
    border: none;
    font-size: 1.5rem;
    transition: all 0.3s;
    /* border: 1px solid black; */
  }
  & div a:hover {
    background-color: #3bb16f;
    cursor: pointer;
    /* border: 2px solid #2e8b57; */
    color: floralwhite;
  }
  & div a:active {
    background-color: #4caf50;
    color: white;
  }
`;

export const LeftSideNav = styled.div`
  display: flex;
  a {
    padding: 0;
    color: floralwhite;
    background-color: #2e8b57;
  }
  h2 {
    padding: 15px 16px;
    /* border: 2px solid white; */

    margin-top: 0;
    margin-bottom: 0;
    /* margin-left: 20px; */
    font-size: 1.5rem;
    font-weight: 400;
    color: floralwhite;
    text-align: center;
    background-color: #4caf50;
    /* padding: 15px 16px; */
  }
`;

export const RightSideNav = styled.div`
  /* color: floralwhite;
  background-color: #2e8b57; */
  margin-right: 20px;
  display: none;
  /* text-align: right; */
  a:nth-child(1) {
    color: floralwhite;
    background-color: #2e8b57;
    margin-right: 5px;
  }
  a:nth-child(2) {
    color: floralwhite;
    background-color: #2e8b57;
    margin-right: 5px;
  }
  a:nth-child(3) {
    color: floralwhite;
    background-color: #2e8b57;
    margin-right: 5px;
  }
  a:nth-child(4) {
    color: floralwhite;
    background-color: #2e8b57;
  }
  @media (min-width: 768px) {
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: flex-end;
    /* justify-content: space-between; */
  }
`;

// const NavWrapper = styled.div`
//   position: fixed;
//   width: 100%;
//   z-index: 1;
//   top: 0;
//   overflow: hidden;
//   color: #000;
//   background-color: #fff;
//   letter-spacing: 4px;
//   padding: 8px 16px;
//   box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
//   & a {
//     padding: 8px 16px;
//     float: left;
//     width: auto;
//     border: none;
//     display: block;
//     outline: 0;
//     white-space: normal;
//     text-decoration: none;
//     overflow: hidden;
//     cursor: pointer;
//     vertical-align: middle;
//     text-align: center;
//     font-family: Verdana, sans-serif;
//   }
//   overflow: hidden;
//   background-color: #333;
//   font-family: Arial, Helvetica, sans-serif;
//   & a {
//     float: left;
//     display: block;
//     color: #f2f2f2;
//     text-align: center;
//     padding: 14px 16px;
//     text-decoration: none;
//     font-size: 17px;
//   }
//   & a:hover {
//     background-color: #ddd;
//     color: black;
//   }
//   & a:active {
//     background-color: #4caf50;
//     color: white;
//   }
//   & div {
//     float: right;
//   }
// `;
