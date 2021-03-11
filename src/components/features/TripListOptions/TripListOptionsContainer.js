import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDuration, changeTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // DONE - add more dispatchers for other filters
  changeDuration: payload => dispatch(changeDuration(payload)),
  changeTag: payload => dispatch(changeTag(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
