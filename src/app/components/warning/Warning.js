import styled from "styled-components";

import { colors } from "../../../utils/colors";

const WarningStyled = styled.div`
  margin-bottom: 56px;
  padding: 32px;
  border-radius: 24px;
  background-color: ${colors.bgShape};
`;

export const Warning = ({ warning }) => {
  return <WarningStyled>{warning}</WarningStyled>;
};
