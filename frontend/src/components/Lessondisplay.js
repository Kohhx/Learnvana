import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Lessondisplay = ({lessonData, role, classId }) => {
  const { _id, title, instructor_name } = lessonData;
  const { studentId }= useParams();
  return (
    <>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>

      {/* cut here */}

      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="
        col-span-4 -mt-3 pt-5 pl-5 rounded-bl-2xl
        font-semibold text-proj-grey2-300 hover:text-opacity-70
       bg-proj-white3-200 border-b border-l border-proj-grey2-200"
       ><Link to={`/students/${studentId}/classes/${_id}`}>{title}</Link>
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
       bg-proj-white3-200 border-proj-grey2-200"
       >sadsaasdss
       </div>
      <div className="
        col-span-3 -mt-3 pt-5 py-3 border-b
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >dates
      </div>
      <div className="
        col-span-4 -mt-3 pt-5 py-3 border-b border-r rounded-br-2xl
        text-proj-grey2-300
        bg-proj-white3-200 border-proj-grey2-200"
        >Learning how to swim effici...
      </div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>
      <div className="col-span-1 -mt-3 pt-5 py-3 text-proj-grey2-300"></div>





    </>

  );
};

export default Lessondisplay;
