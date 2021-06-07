import styled from "styled-components";

import { Button } from "../buttons/Button";

const CtaStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ ison }) => (ison ? "28px" : "56px")};

  .buttons {
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
    margin-bottom: ${({ ison }) => (ison ? "32px" : "64px")};
  }
`;

export const Cta = ({
  isForm = false,
  buttonTtl = { idle: "idle", active: "active" },
  buttonIcon,
  setForm = () => console.log("cta handler"),
}) => {
  return (
    <CtaStyled ison={isForm}>
      <Button
        icon={buttonIcon}
        title={isForm ? buttonTtl.active : buttonTtl.idle}
        width={256}
        active={isForm}
        handler={() => setForm(!isForm)}
      />
    </CtaStyled>
  );
};
