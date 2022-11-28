import styled from "@emotion/styled";

const SortDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const RadioSortDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SortRadioList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
`;

function Sort({ sortBy, setSortBy }) {
  function handleSortClick(e) {
    const name = e.target.name;
    setSortBy(name);
  }

  return (
    <SortDiv>
      <h3>Sort by:</h3>
      <SortRadioList>
        <RadioSortDiv>
          <p>Cost:</p>
          <input
            type="radio"
            name="price"
            checked={sortBy === "price" ? true : false}
            onClick={handleSortClick}
          />
        </RadioSortDiv>
        <RadioSortDiv>
          <p>Date:</p>
          <input
            type="radio"
            name="date"
            checked={sortBy === "date" ? true : false}
            onClick={handleSortClick}
          />
        </RadioSortDiv>
        <RadioSortDiv>
          <p>None:</p>
          <input
            type="radio"
            name="none"
            checked={sortBy === "none" ? true : false}
            onClick={handleSortClick}
          />
        </RadioSortDiv>
      </SortRadioList>
    </SortDiv>
  );
}

export default Sort;
