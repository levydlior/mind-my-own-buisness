import styled from "@emotion/styled";

const SortDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

const RadioSortDiv = styled.div`
  display: flex;
  justify-content: center;
`;

function Sort({ sortByPrice, setSortByPrice }) {
  function handleSortClick() {
    setSortByPrice(!sortByPrice);
  }

  return (
    <SortDiv>
      <h3>Sort by:</h3>
      <RadioSortDiv>
        <p>Cost:</p>
        <input
          type="radio"
          checked={sortByPrice ? true : false}
          onClick={handleSortClick}
        />
      </RadioSortDiv>
    </SortDiv>
  );
}

export default Sort;
