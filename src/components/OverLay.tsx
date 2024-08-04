import React from "react";

interface onClick {
    onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Overlay = ({ onClick }: onClick) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-screen backdrop-brightness-50 bg-white/10 z-10`}
            onClick={() => onClick(false)}
        />
    );
};

export default Overlay;
