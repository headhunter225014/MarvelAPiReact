import useMarvelService from "../services/MarvelService";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import setContent from "../../utils/setContent";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError()

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage