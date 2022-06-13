import styled, { css } from "styled-components";

const btn = () => css`
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  background-color: #286f6d;
  color: white;
`;
const btnPrimary = btn("#4f93ce", "#285f8f");

export default styled.div`
  form {
    max-width: 350px;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    background-color: #b3e5d1;

    & > div {
      display: flex;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: #286f6d;
        font-weight: bold;
        width: 150px;
      }
    }
    & > .buttons {
      justify-content: center;
      margin-top: 15px;
    }
    button {
      &[type="submit"] {
        ${btnPrimary};
      }
    }
  }
`;
