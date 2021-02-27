import React from 'react';
import defaultLogoSrc from '../images/logo.png';

type Props = {
    logoSrc?: string;
}
export const SourceItemLogo: React.FC<Props> = ({logoSrc}):JSX.Element => {
    return ( 
        <div className="source-item-logo">
            <img
                src={ logoSrc || defaultLogoSrc }
                alt="logo"
            />
        </div>
    );
}