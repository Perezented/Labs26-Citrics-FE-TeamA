import React, { useContext } from 'react';
import './styles/AddCityBar.scss';
import AutoCompleteInput from './AutoComplete';
import { ReportContext } from '../../state/contexts/ReportContext';
const AddCityBar = props => {
  // Search bar for adding cities
  let { compareList } = useContext(ReportContext);
  let { setCompareList } = useContext(ReportContext);
  // passed in context items as props to help with tests.
  return (
    <AutoCompleteInput
      compareList={compareList}
      setCompareList={setCompareList}
      searchOptions={props.searchOptions}
    />
  );
};
export default AddCityBar;
