import React, {
  memo,
  forwardRef,
  useRef,
  createContext,
} from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useChangeList } from '@/utils/custom-hooks'
import { getComment } from "@/services/comment";

import UserComment from "./user-comment";
import Pagination from '@/components/pagination'

import { CommentWrapper } from "./style";

export const CommentContext = createContext();

export default memo(
  forwardRef(function Comment(props, ref) {
    // const { comments } = props;

    // const [commentList, setCommentList] = useState([]);
    const [list, count, changeList, setList] = useChangeList(getComment)

    const { adminInfo } = useSelector(
      (state) => ({
        adminInfo: state.getIn(["admin", "adminInfo"]),
      }),
      shallowEqual
    );

    const paginationRef = useRef()

    // useEffect(() => {
    //   getComment().then((res) => {
    //     // console.log(res)
    //     setCommentList(res.data);
    //   });
    // }, []);

    return (
      <CommentWrapper>
        <CommentContext.Provider
          value={{ adminInfo, commentList: list, setCommentList: setList }}
        >
          {/* 第一層就是沒有回覆評論這個屬性的留言 */}
          {list &&
            list
              .map((item, index) => {
                return <UserComment key={item.id} item={item} index={index} />;
              })}
        </CommentContext.Provider>
        <Pagination total={count} changeList={changeList} ref={paginationRef} />
      </CommentWrapper>
    );
  })
);
