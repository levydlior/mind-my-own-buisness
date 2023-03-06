import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";

export const BusinessLi = styled.li`
  display: flex;
  liststyle: none;
  // margin-top: 6px;
  // margin-bottom: 6px;
  margin: 15px 0px 15px 0px;
`;

export const StyledIcon = styled(DeleteIcon)`
  &:hover {
    cursor: pointer;
    color: gray;
  }
  margin-left: 0.5rem;
`;
