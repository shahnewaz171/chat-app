import { css } from '@emotion/css'

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 900,
    // maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: "20px 40px",
    background: "#fff",
    '&::-webkit-scrollbar': {
        width: '15px'
    },
    '&::-webkit-scrollbar-track': {
        background: "#182F59",
        zIndex: 999
    },
    '&::-webkit-scrollbar-thumb': {
        background: "#fff",
        borderRadius: "15px",
        border: "2px solid #182F59"
    }
};

export const ROOT_CSS = css({
    height: '400px'
});