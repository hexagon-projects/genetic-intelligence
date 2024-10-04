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

    // const studentProperties = [
    //     'grade',
    //     'majoring',
    //     'institutions'
    // ];

    const basicStudentProperties = [
        'grade',
        'institutions'
    ];

    // Define all student properties including 'majoring'
    const fullStudentProperties = [
        ...basicStudentProperties,
        'majoring'
    ];

    // Function to check if any of the given properties are null
    function hasNullProperties(properties) {
        return properties.some(prop => data[prop] === null);
    }

    // // Check for is_student 0
    // if (data.is_student === 0 && hasNullProperties(commonProperties)) {
    //     return true;
    // }

    // Check for is_student 1
    // if (data.is_student === 1 && (hasNullProperties(commonProperties) || hasNullProperties(studentProperties))) {
    //     return true;
    // }
    if (hasNullProperties(commonProperties)) {
        return true;
    }

    if (data.is_student === 1) {
        const institutionType = data.institutions?.type;
        console.log(`sakolana`, data.institutions?.type)

        // If the institution type is TK, SD, or SMP, don't check 'majoring'
        if (['TK', 'SD', 'SMP'].includes(institutionType)) {
            if (hasNullProperties(basicStudentProperties)) {
                return true;
            }
        } else {
            // For other institution types, check all student properties
            if (hasNullProperties(fullStudentProperties)) {
                return true;
            }
        }
    }

    return false;
}

export default cekDataProfile