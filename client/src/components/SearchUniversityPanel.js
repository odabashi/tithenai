import { Grid, IconButton, TextField, InputAdornment, FormControlLabel, Checkbox, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {useTranslation} from "react-i18next";
const useStyles = makeStyles(theme => ({
    searchBox: {
        margin: "2vh 0",
        fontFamily: "Ubuntu",
        width: "70%",
        [theme.breakpoints.down('md')]: {
            width: "80%",
        },
        [theme.breakpoints.down('sm')]: {
            width: "96%",
        },
    }
}));

const SearchUniversityPanel = (props) => {
    const { handleSearchUniversities, initialSearchingValues } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const [searchedValue, setSearchedValue] = useState("");
    const [searchByName, setSearchByName] = useState(true);
    const [searchByCountry, setSearchByCountry] = useState(false);
    const [searchByState, setSearchByState] = useState(false);
    const [errorIndicator, setErrorIndicator] = useState(false);
    const [searchBoxError, setSearchBoxError] = useState(false);

    useEffect(() => {
        if(typeof(initialSearchingValues) !== "undefined" && initialSearchingValues !== null) {
            setSearchedValue(initialSearchingValues.query);
            if(initialSearchingValues.dimensions.includes('name')) {
                setSearchByName(true)
            } else {
                setSearchByName(false)
            }
            if(initialSearchingValues.dimensions.includes('country')) {
                setSearchByCountry(true)
            } else {
                setSearchByCountry(false)
            }
            if(initialSearchingValues.dimensions.includes('state')) {
                setSearchByState(true)
            } else {
                setSearchByState(false)
            }
        }
    }, [initialSearchingValues])

    const handleSearch = () => {
        if(searchedValue === "") {
            setSearchBoxError(true);
        } else {
            setSearchBoxError(false);
            if( searchByName    === false &&
                searchByCountry === false &&
                searchByState   === false ) {
                    setErrorIndicator(true);
            } else {
                setErrorIndicator(false);
                let dimensions = [];
                if( searchByName === true ) {
                    dimensions.push("name");
                }
                if( searchByCountry === true ) {
                    dimensions.push("country");
                }
                if( searchByState === true ) {
                    dimensions.push("state");
                }
                const requestBody = {
                    "query": searchedValue,
                    "dimensions": dimensions,
                }
                handleSearchUniversities(requestBody);
            }
        }
    }

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                    color="secondary"
                    label={t('search.search_for')} 
                    name="searchUniField"
                    placeholder='e.g. Türk Alman Üniversitesi'
                    type="text"
                    variant="outlined"
                    value={searchedValue}
                    error={searchBoxError}
                    helperText={searchBoxError === true ? t('dialogs.required_field') : ""}
                    onChange={(event) => setSearchedValue(event.target.value)}
                    className={classes.searchBox}
                    InputLabelProps={{
                        style: {
                            fontFamily: 'Ubuntu'
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            {searchedValue !== "" &&
                                <IconButton
                                    aria-label="search"
                                    onClick={() => setSearchedValue("")}>
                                    <ClearIcon style={{color: "#b5201e"}} />
                                </IconButton>
                            }
                            <IconButton
                                data-testid="search-uni-button"
                                aria-label="search"
                                onClick={() => handleSearch()}
                                >
                                <SearchIcon color="secondary" />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}/>
            </Grid>
            <Grid item container xs={12} sm={12} md={12} lg={12} alignItems="center" justifyContent="center">
                <p style={{fontFamily: "Ubuntu", color: "#b5201e", display: (errorIndicator === true) ? "flex" : "none"}}>{t('search.you_should_tag')}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <p style={{fontFamily: "Ubuntu"}}>{t('search.search_by')}</p>
            </Grid>
            <Grid item container xs={12} sm={12} md={9} lg={9} alignItems="center" justifyContent="flex-start" style={{textAlign: "start"}}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByName}
                            onChange={(event) => setSearchByName(event.target.checked)}
                            name="name"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                {t('search.name')}
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByCountry}
                            onChange={(event) => setSearchByCountry(event.target.checked)}
                            name="country"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                {t('search.country')}
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={searchByState}
                            onChange={(event) => setSearchByState(event.target.checked)}
                            name="state"
                            color="secondary"
                        />}
                        label={
                            <Typography variant="subtitle2" component="div" style={{fontFamily: "Ubuntu"}}>
                                {t('search.state')}
                            </Typography>}
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchUniversityPanel;