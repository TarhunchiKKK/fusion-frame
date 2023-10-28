import { useState } from "react";

export function useHeader(searchedObjects: 'Albums' | 'Media'){ 
    const [searchModal, setsearchModal] = useState<boolean>(false)
    const openSearchModal = () => setsearchModal(true)
    const closeSearchModal = () => setsearchModal(false)

    const [addDirectoryModal, setAddDirectoryModal] = useState<boolean>(false)
    const openAddDirectoryModal = () => setAddDirectoryModal(true)
    const closeAddDirectoryModal = () => setAddDirectoryModal(false)

    return {searchModal, openSearchModal, closeSearchModal, addDirectoryModal, openAddDirectoryModal, closeAddDirectoryModal, }
}