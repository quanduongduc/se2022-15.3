import dateFormat from 'dateformat';
import '../css/track.css';
interface Props {
    item: any;
    itemIndex: number;
}

const Track = ({ item, itemIndex }: Props) => {
    const dateCreated = dateFormat(item.created_at, 'dd/mm/yyyy h:MM:ss TT');
    return (
        <div className="track-container text-white d-flex align-items-center rounded-3 mt-3 row-cols-4 mb-2">
            <div className="index-container d-flex align-items-center col-1">
                <span className="index-track d-flex align-items-center">
                    {itemIndex + 1}
                </span>
            </div>
            <div className="track-all-info d-flex align-items-center col-10">
                <img src={item.themeUrl} alt="" className="track-img" />
                <div className="track-info col-5">
                    <div className="track-title-wrapper d-flex align-items-center">
                        <span className="track-title">{item.title}</span>
                    </div>
                    <div className="track-artist d-flex align-items-center">
                        {item.artists[0].name}
                    </div>
                </div>
                <div className="track-created d-flex align-items-center col-4">
                    {dateCreated}
                </div>
                <div className="track-duration d-flex align-items-center col">
                    {item.duration}
                </div>
            </div>
        </div>
    );
};

export default Track;
