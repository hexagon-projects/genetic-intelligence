const cekDataProfile = () => {
    const data = JSON.parse(localStorage.getItem('userData'))

    const commonProperties = [
        'birth_place',
        'birth_date',
        'gender',
        'region',
        'village',
        'address',
        'blood_group',
        'religion',
        'status',
        'ethnic',
        'nationality',
        'child_number',
        'from_child_number'
    ];

    const studentProperties = [
        'grade',
        'majoring',
        'institutions'
    ];

    // Function to check if any of the given properties are null
    function hasNullProperties(properties) {
        return properties.some(prop => data[prop] === null);
    }

    // Check for is_student 0
    if (data.is_student === 0 && hasNullProperties(commonProperties)) {
        return true;
    }

    // Check for is_student 1
    if (data.is_student === 1 && (hasNullProperties(commonProperties) || hasNullProperties(studentProperties))) {
        return true;
    }

    return false;
}

export default cekDataProfile