import { useParams } from "react-router-dom";
import { Address } from "ton";
import { isValidAddress } from "utils";

export const useJettonAddress = () => {
  // const navigate = useNavigatePreserveQuery();
  const { id: jettonAddress } = useParams();
  let isAddressValid = isValidAddress(jettonAddress || "", "Invalid jetton address");

  let jettonFriendlyAddress = isAddressValid ? Address.parse(jettonAddress!).toFriendly() : null;

  // useEffect(() => {
  //   if (id && jettonAddress && jettonAddress !== id) {
  //     navigate(`/jetton/${jettonAddress}`, { replace: true });
  //   }
  // }, [id, jettonAddress, navigate]);

  return {
    jettonAddress,
    jettonFriendlyAddress,
    isAddressEmpty: !jettonAddress,
  };
};
