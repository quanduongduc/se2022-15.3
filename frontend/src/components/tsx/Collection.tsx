import { ReactElement } from 'react';
import Tracks from './Tracks';
import '../css/collection.css';

const Collection = (): ReactElement => (
    <div className="collection-wrapper">
        <div className="collection-content overflow-auto">
            <Tracks />
        </div>
    </div>
);

export default Collection;
