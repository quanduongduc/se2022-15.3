import '../css/track.css';

interface Props {
    item: any;
    itemIndex: number;
}

const Track = ({ item, itemIndex }: Props) => {
    return (
        <div className="track-container text-white d-flex align-items-center rounded-3">
            <div className="index-container me-5 d-flex align-items-center">
                <span className="index-track d-flex align-items-center">
                    {itemIndex + 1}
                </span>
            </div>
            <div className="track-all-info d-flex align-items-center">
                <img src={item.themeUrl} alt="" className="track-img" />
                <div className="track-info">
                    <div className="track-title d-flex align-items-center">
                        {item.title}
                    </div>
                    <div className="track-artist d-flex align-items-center">
                        {item.artists[0].name}
                    </div>
                </div>
            </div>
            <div className="track-created d-flex align-items-center">
                {item.created_at}
            </div>
            <div className="track-created d-flex align-items-center">
                {item.duration}
            </div>
        </div>
    );
};

export default Track;
