import React, { useRef, useState } from 'react'
import {
  fieldText,
  fieldSelect,
  fieldTextarea,
} from '../../components/Patient/Fields'
import { SessionButtons } from '../../components/'
import { sessionFormat, updateSession } from '../../services/session.services'
import moment from 'moment'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from './firebase'

const General = ({
  setEditMode,
  sessionIndex,
  mode,
  sessionId,
  sessionData,
  setSessionData,
}) => {
  const monthRef = useRef()
  const [selectedSession, setSelectedSession] = useState(
    sessionData[sessionIndex].month[0].visit[0]
  )
  const visitRef = useRef()
  const semesterRef = useRef()
  const dateRef = useRef()
  const aogInWeeksRef = useRef()
  const weightRef = useRef()
  const remarksRef = useRef()

  const crRef = useRef()
  const tempRef = useRef()
  const fhRef = useRef()
  const fhtRef = useRef()
  const bpRef = useRef()
  const presRef = useRef()

  const bloodTypeRef = useRef()
  const hgbRef = useRef()
  const urinalysisRef = useRef()
  const respiratoryRateRef = useRef()
  const vdrRef = useRef()

  const heartRateRef = useRef()
  const measurementRef = useRef()

  const ironFotateRxRef = useRef()
  const mibfRef = useRef()
  const adviseDangerSignsRef = useRef()

  const emergencyPlanRef = useRef()
  const nextVisitRef = useRef()

  const tuberculosisRef = useRef()
  const heartDiseaseRef = useRef()
  const diabetesRef = useRef()
  const bronchilRef = useRef()
  const goiterRef = useRef()
  const successRef = useRef()

  const ultrasound1Ref = useRef()
  const ultrasound2Ref = useRef()
  const ultrasound3Ref = useRef()

  const [imageUpload1, setImageUpload1] = useState(null)
  const [imageUpload2, setImageUpload2] = useState(null)
  const [imageUpload3, setImageUpload3] = useState(null)

  const extendSaveHandler = async (newData) => {
    const formattedData = sessionFormat(sessionData[sessionIndex].month, [
      newData,
    ])

    let updateFunc = await updateSession(sessionId, { month: formattedData })
    if (updateFunc.success) {
      let temp = sessionData
      const temp_session = {
        ...sessionData[sessionIndex],
        month: formattedData,
      }

      temp[sessionIndex] = temp_session
      setSessionData(temp)
      setSelectedSession(
        temp_session.month[monthRef.current.value - 1].visit[
          visitRef.current.value - 1
        ]
      )

      const ty =
        temp_session.month[monthRef.current.value - 1].visit[
          visitRef.current.value - 1
        ]

      setEditMode(false)
      setImageUpload1(null)
      setImageUpload2(null)
      setImageUpload3(null)
    }
  }

  const saveHandler = async () => {
    if (imageUpload1 != null) {
      const imageRef1 = ref(storage, `images/${imageUpload1.name + v4()}`)
      await uploadBytes(imageRef1, imageUpload1).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          selectedSession.ultrasound1 = url
        })
      })
    }

    if (imageUpload2 != null) {
      const imageRef2 = ref(storage, `images/${imageUpload2.name + v4()}`)
      await uploadBytes(imageRef2, imageUpload2).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          selectedSession.ultrasound2 = url
        })
      })
    }

    if (imageUpload3 != null) {
      const imageRef3 = ref(storage, `images/${imageUpload3.name + v4()}`)
      await uploadBytes(imageRef3, imageUpload3).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          selectedSession.ultrasound3 = url
        })
      })
    }

    const newData = {
      monthNumber: monthRef.current.value,
      visit: [
        {
          visitNumber: visitRef.current.value,
          semester: semesterRef.current.value,
          date: dateRef.current.value,
          aogInWeeks: aogInWeeksRef.current.value,
          weight: weightRef.current.value,
          remarks: remarksRef.current.value,
          cr: crRef.current.value,
          temp: tempRef.current.value,
          fh: fhRef.current.value,
          fht: fhtRef.current.value,
          bp: bpRef.current.value,
          pres: presRef.current.value,
          bloodType: bloodTypeRef.current.value,
          hgb: hgbRef.current.value,
          urinalysis: urinalysisRef.current.value,
          respiratoryRate: respiratoryRateRef.current.value,
          vdr: vdrRef.current.value,
          heartRate: heartRateRef.current.value,
          measurement: measurementRef.current.value,
          ironFotateRx: ironFotateRxRef.current.value,
          mibf: mibfRef.current.value,
          adviseDangerSigns: adviseDangerSignsRef.current.value,
          nextVisit: nextVisitRef.current.value,
          tuberculosis: tuberculosisRef.current.value,
          heartDisease: heartDiseaseRef.current.value,
          diabetes: diabetesRef.current.value,
          bronchil: bronchilRef.current.value,
          goiter: goiterRef.current.value,
          emergencyPlan: emergencyPlanRef.current.value,
          ultrasound1: selectedSession.ultrasound1,
          ultrasound2: selectedSession.ultrasound2,
          ultrasound3: selectedSession.ultrasound3,
        },
      ],
    }

    extendSaveHandler(newData)
  }

  const testFunc = () => {
    setImageUpload1(null)
    setImageUpload2(null)
    setImageUpload3(null)

    let monthNo = monthRef.current.value
    let visitNo = visitRef.current.value

    const selected =
      sessionData[sessionIndex].month[monthNo - 1].visit[visitNo - 1]
    setSelectedSession({ ...selectedSession, ...selected })
  }

  return (
    <div className="flex h-sessionModal flex-col justify-between pb-20">
      {successRef.current && (
        <p className="w-full rounded-md bg-emerald-300 p-4 text-emerald-700">
          Update Successfully!
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 px-8 grid-cols-2 xl:grid-cols-3">
        <div className="col-span-2">
          <div className="mb-2 flex flex-col gap-4 border-b-2 border-dashed border-slate-400 pb-4  sm:flex-row ">
            {fieldSelect(
              null,
              'Month:',
              'month',
              monthRef,
              [
                { name: '1', value: '1' },
                { name: '2', value: '2' },
                { name: '3', value: '3' },
                { name: '4', value: '4' },
                { name: '5', value: '5' },
                { name: '6', value: '6' },
                { name: '7', value: '7' },
                { name: '8', value: '8' },
                { name: '9', value: '9' },
              ],
              null,
              mode,
              {
                event: true,
                func: testFunc,
              }
            )}
            {fieldSelect(
              null,
              'Visit:',
              'visit',
              visitRef,
              [
                { name: '1', value: '1' },
                { name: '2', value: '2' },
                { name: '3', value: '3' },
                { name: '4', value: '4' },
                { name: '5', value: '5' },
              ],
              null,
              mode,
              {
                event: true,
                func: testFunc,
              }
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 border-b-2 border-dashed border-slate-400 pb-4 sm:grid-cols-2">
            <div>
              {fieldText(
                null,
                'Semester:',
                'semester',
                semesterRef,
                selectedSession?.semester,
                'number',
                !mode
              )}
              {fieldText(
                null,
                'Date:',
                'date',
                dateRef,
                selectedSession?.date
                  ? moment(selectedSession?.date).format('YYYY-MM-DD')
                  : 'YYYY-MM-DD',
                'date',
                !mode
              )}
              {fieldText(
                null,
                'AOG in weeks:',
                'aoginweeks',
                aogInWeeksRef,
                selectedSession?.aogInWeeks,
                'number',
                !mode
              )}
              {fieldText(
                null,
                'Weight (Kg):',
                'weight',
                weightRef,
                selectedSession?.weight,
                'number',
                !mode
              )}
              {fieldText(
                null,
                'Remarks:',
                'remarks',
                remarksRef,
                selectedSession?.remarks,
                'string',
                !mode
              )}
            </div>
            <div>
              {fieldText(
                null,
                'CR:',
                'cr',
                crRef,
                selectedSession?.cr,
                'text',
                !mode
              )}
              {fieldText(
                null,
                'Temp (Celsius):',
                'temp',
                tempRef,
                selectedSession?.temp,
                'number',
                !mode
              )}
              {fieldText(
                null,
                'FH (cm):',
                'fn',
                fhRef,
                selectedSession?.fh,
                'number',
                !mode
              )}
              {fieldText(
                null,
                'FHT:',
                'fht',
                fhtRef,
                selectedSession?.fht,
                'number',
                !mode
              )}
              {fieldText(
                null,
                'BP (mmHg):',
                'bp',
                bpRef,
                selectedSession?.bp,
                'string',
                !mode
              )}
              {fieldText(
                null,
                'PRES:',
                'pres',
                presRef,
                selectedSession?.pres,
                'string',
                !mode
              )}
            </div>
          </div>
          <div>
            <p className="py-4">Laboratory Result</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b-2 border-dashed border-slate-400 pb-4">
              <div>
                {fieldText(
                  null,
                  'Blood Type:',
                  'bloodtype',
                  bloodTypeRef,
                  selectedSession?.bloodType,
                  'text',
                  !mode
                )}
                {fieldText(
                  null,
                  'Hgb:',
                  'hgb',
                  hgbRef,
                  selectedSession?.hgb,
                  'text',
                  !mode
                )}
                {fieldText(
                  null,
                  'Urinalysis:',
                  'urinalysis',
                  urinalysisRef,
                  selectedSession?.urinalysis,
                  'text',
                  !mode
                )}
              </div>
              <div>
                {fieldText(
                  null,
                  'Respiratory Rate:',
                  'respiratoryRate',
                  respiratoryRateRef,
                  selectedSession?.respiratoryRate,
                  'text',
                  !mode
                )}
                {fieldText(
                  null,
                  'VDR:',
                  'vdr',
                  vdrRef,
                  selectedSession?.vdr,
                  'text',
                  !mode
                )}
              </div>
            </div>

            <p className="py-4">Baby Information</p>
            <div className="flex flex-col border-b-2 border-dashed border-slate-400 pb-4">
              <div className="flex gap-x-4 overflow-auto">
                {mode ? (
                  <>
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload1(event.target.files[0])
                      }}
                    />
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload2(event.target.files[0])
                      }}
                    />
                    <input
                      type="file"
                      onChange={(event) => {
                        setImageUpload3(event.target.files[0])
                      }}
                    />
                  </>
                ) : (
                  <>
                    {selectedSession.ultrasound1 == '' ? (
                      <div className="flex h-[14rem] w-[14rem] items-center justify-center rounded-md border">
                        No Image
                      </div>
                    ) : (
                      <img
                        className="h-[14rem] w-[14rem]"
                        src={selectedSession.ultrasound1}
                      />
                    )}
                    {selectedSession.ultrasound2 == '' ? (
                      <div className="flex h-[14rem] w-[14rem] items-center justify-center rounded-md border">
                        No Image
                      </div>
                    ) : (
                      <img
                        className="h-[14rem] w-[14rem]"
                        src={selectedSession.ultrasound2}
                      />
                    )}
                    {selectedSession.ultrasound3 == '' ? (
                      <div className="flex h-[14rem] w-[14rem] items-center justify-center rounded-md border">
                        No Image
                      </div>
                    ) : (
                      <img
                        className="h-[14rem] w-[14rem]"
                        src={selectedSession.ultrasound3}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="flex w-full gap-x-4">
                {fieldText(
                  null,
                  'Heart Rate:',
                  'heartRate',
                  heartRateRef,
                  selectedSession?.heartRate,
                  'text',
                  !mode
                )}
                {fieldText(
                  null,
                  'Measurement (cm):',
                  'measurement',
                  measurementRef,
                  selectedSession?.measurement,
                  'number',
                  !mode
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4 flex-col sm:flex-row">
              {fieldText(
                null,
                'Iron/fotate/Rx:',
                'ironFotateRx',
                ironFotateRxRef,
                selectedSession?.ironFotateRx,
                'text',
                !mode
              )}
              {fieldSelect(
                null,
                'Mother intends to breast feed:',
                'mibf',
                mibfRef,
                [
                  { name: 'No', value: 'no' },
                  { name: 'Yes', value: 'yes' },
                ],
                selectedSession?.mibf,
                !mode
              )}
            </div>
            {fieldTextarea(
              null,
              'Advise on 4 danger signs:',
              'adviseDangerSigns',
              adviseDangerSignsRef,
              selectedSession?.adviseDangerSigns,
              !mode
            )}
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="border-b-2 border-dashed border-slate-400 pb-4">
            {fieldText(
              null,
              'Suggested date to create an appointment:',
              'nextVisit',
              nextVisitRef,
              selectedSession?.nextVisit
                ? moment(selectedSession?.nextVisit).format('YYYY-MM-DD')
                : 'YYYY-MM-DD',
              'date',
              !mode
            )}
            {fieldTextarea(
              null,
              'Emergency plans and place of delivery:',
              'emergencyPlan',
              emergencyPlanRef,
              selectedSession?.emergencyPlan,
              !mode
            )}
          </div>
          <div>
            <p className="py-4">Present Health Problems</p>
            {fieldSelect(
              null,
              'Tuberculosis:',
              'tuberculosis',
              tuberculosisRef,
              [
                { name: 'No', value: 'no' },
                { name: 'Yes', value: 'yes' },
              ],
              selectedSession?.tuberculosis,
              !mode
            )}
            {fieldSelect(
              null,
              'Heart Disease:',
              'heartDisease',
              heartDiseaseRef,
              [
                { name: 'No', value: 'no' },
                { name: 'Yes', value: 'yes' },
              ],
              selectedSession?.heartDisease,
              !mode
            )}
            {fieldSelect(
              null,
              'Diabetes:',
              'diabetes',
              diabetesRef,
              [
                { name: 'No', value: 'no' },
                { name: 'Yes', value: 'yes' },
              ],
              selectedSession?.diabetes,
              !mode
            )}
            {fieldSelect(
              null,
              'Bronchil Asthma:',
              'bronchil',
              bronchilRef,
              [
                { name: 'No', value: 'no' },
                { name: 'Yes', value: 'yes' },
              ],
              selectedSession?.bronchil,
              !mode
            )}
            {fieldSelect(
              null,
              'Goiter:',
              'goiter',
              goiterRef,
              [
                { name: 'No', value: 'no' },
                { name: 'Yes', value: 'yes' },
              ],
              selectedSession?.goiter,
              !mode
            )}
          </div>
        </div>
      </div>
      <SessionButtons
        save={saveHandler}
        editMode={mode}
        setEditMode={setEditMode}
      />
    </div>
  )
}

export default General
