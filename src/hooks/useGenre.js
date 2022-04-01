import { useSelector } from "react-redux";

const useGenre = () => {
  const { genres } = useSelector((state) => ({
    genres: state.base?.get("genres"),
    form: Object.values(state.base?.get("form")?.toJS() || {}),
  }));

  const getSubGenreByGenreId = (id) => genres?.getIn([id, "subgenres"]);

  const getSubgenreDetailById = (genreId, subgenreId) => {
    return getSubGenreByGenreId(genreId)?.find(
      (subgenre) => subgenre?.id === subgenreId
    );
  };
  const getGenreDetail = (id) => genres?.get(id);

  return {
    genres: Object.values(genres?.toJS() || {}),
    getGenreDetail,
    getSubGenreByGenreId,
    getSubgenreDetailById,
  };
};

export default useGenre;
