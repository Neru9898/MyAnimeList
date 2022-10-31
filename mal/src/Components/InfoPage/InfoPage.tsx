import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InfoPage = () => {
  const params = useParams();
  const [currInfo, setCurrInfo] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${params.id}/full`)
      .then((res: any) => {
        setCurrInfo(res.data.data);

        setLoading(false);
      });
  }, []);
  return (
    <div>
      {!loading && <span>{currInfo.title}</span>}

      <span>aertsoietjr</span>
    </div>
  );
};

export default InfoPage;
