import React from 'react';
import { useResume } from '../context/resumeContext';

const Modal: React.FC = () => {
    const { isModalOpen, setIsModalOpen, modalContent } = useResume();
    
    //useEffect((
    //) => { console.log('modalContent:', modalContent); }, [modalContent]);

    if (!isModalOpen) return null;
    return (
        
        <div className={`z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
            <div onClick={() => setIsModalOpen(false)} className="z-30 w-full h-full ">

            </div>
            <div className={`z-40 h-min w-72 bg-white rounded-lg p-8 absolute flex flex-col  space-y-4 ${modalContent.color}`}>
                {modalContent.backgroundImage && (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${modalContent.backgroundImage})` }}
                    />
                )}
                {modalContent.image && <img src={modalContent.image} alt="Modal Image" className="mb-4" />}
                {modalContent.heading && <h2 className="text-2xl font-bold mb-2">{modalContent.heading}</h2>}
                {modalContent.country && <h3 className="text-xl font-bold mb-2">{modalContent.country}</h3>}
                {modalContent.paragraph && <p className="mb-4">{modalContent.paragraph}</p>}
                {modalContent.onCloseFunc && (
                    <button
                        className="z-40 font-bold text-xl bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded cursor-pointer"
                        onClick={() =>  modalContent.onCloseFunc ? modalContent.onCloseFunc() : setIsModalOpen(false)}
                    >
                        {modalContent.buttonLabel ? modalContent.buttonLabel : 'Close'}
                    </button>
                )}
            </div>
        </div>

    );
};

export default Modal;