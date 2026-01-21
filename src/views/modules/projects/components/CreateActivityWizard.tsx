import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Steps } from '@/components/ui'
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import Step1CreateActivity from './wizard-steps/Step1CreateActivity'
import Step2AttachContent from './wizard-steps/Step2AttachContent'
import Step3WorkZone from './wizard-steps/Step3WorkZone'
import Step4Team from './wizard-steps/Step4Team'
import Step5DelegateRoute from './wizard-steps/Step5DelegateRoute'
import { apiCreateActivity } from '@/services/ActivityService'
import { apiCreateWorkZone } from '@/services/ProjectService'
import { apiAddProjectTeamMember } from '@/services/ProjectService'
import { apiCreateWorkRoute } from '@/services/ProjectService'
import type { CreateActivityRequest } from '@/@types/activity'
import type { CreateWorkZoneRequest, CreateProjectTeamMemberRequest, CreateWorkRouteRequest } from '@/@types/project'

interface WizardData {
    // Step 1
    activityName: string
    activityType: 'Training' | 'Survey'
    activityDescription: string
    startDate: string
    endDate: string
    instructions?: string
    
    // Step 2
    attachedContent?: {
        questionnaireId?: string
        files?: File[]
        links?: string[]
    }
    
    // Step 3
    workZone?: {
        name: string
        municipality: string
        department: string
        veredas: string[]
        mapCoordinates?: any
    }
    useExistingZone?: boolean
    existingZoneId?: string
    
    // Step 4
    teamMembers: Array<{
        userId: string
        role: string
    }>
    
    // Step 5
    workRoutes: Array<{
        technicianId: string
        assignedVeredas: string[]
        farmsCount: number
        farmersCount: number
        mapRoute?: any
    }>
}

interface CreateActivityWizardProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

const CreateActivityWizard = ({ isOpen, onClose, onSuccess }: CreateActivityWizardProps) => {
    const { projectId } = useParams<{ projectId: string }>()
    const [currentStep, setCurrentStep] = useState(0)
    const [wizardData, setWizardData] = useState<Partial<WizardData>>({
        teamMembers: [],
        workRoutes: []
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createdActivityId, setCreatedActivityId] = useState<string | null>(null)

    const form = useForm<WizardData>({
        defaultValues: wizardData
    })

    const steps = [
        { title: 'Crear', description: 'Información básica' },
        { title: 'Adjuntar', description: 'Contenido adicional' },
        { title: 'Zona', description: 'Zona de trabajo' },
        { title: 'Equipo', description: 'Asignar equipo' },
        { title: 'Delegar', description: 'Ruta de trabajo' }
    ]

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleStepChange = (step: number) => {
        setCurrentStep(step)
    }

    const updateWizardData = (data: Partial<WizardData>) => {
        setWizardData(prev => ({ ...prev, ...data }))
    }

    const handleSubmit = async () => {
        if (!projectId) {
            console.error('Project ID is required')
            return
        }

        setIsSubmitting(true)
        try {
            // Step 1: Create Activity
            const activityRequest: CreateActivityRequest = {
                name: wizardData.activityName!,
                description: wizardData.activityDescription!,
                type: wizardData.activityType!,
                startDate: wizardData.startDate!,
                endDate: wizardData.endDate!,
                projectId: projectId
            }

            const activityId = await apiCreateActivity(activityRequest)
            setCreatedActivityId(activityId)

            // Step 3: Create Work Zone (if new zone)
            if (wizardData.workZone && !wizardData.useExistingZone) {
                const workZoneRequest: CreateWorkZoneRequest = {
                    projectId: projectId,
                    name: wizardData.workZone.name,
                    municipality: wizardData.workZone.municipality,
                    department: wizardData.workZone.department,
                    veredas: wizardData.workZone.veredas,
                    mapCoordinates: wizardData.workZone.mapCoordinates
                }
                await apiCreateWorkZone(workZoneRequest)
            }

            // Step 4: Add Team Members
            if (wizardData.teamMembers && wizardData.teamMembers.length > 0) {
                const teamPromises = wizardData.teamMembers.map(member => {
                    const request: CreateProjectTeamMemberRequest = {
                        projectId: projectId,
                        userId: member.userId,
                        role: member.role
                    }
                    return apiAddProjectTeamMember(request)
                })
                await Promise.all(teamPromises)
            }

            // Step 5: Create Work Routes
            if (wizardData.workRoutes && wizardData.workRoutes.length > 0) {
                const routePromises = wizardData.workRoutes.map(route => {
                    const request: CreateWorkRouteRequest = {
                        activityId: activityId,
                        technicianId: route.technicianId,
                        assignedVeredas: route.assignedVeredas,
                        farmsCount: route.farmsCount,
                        farmersCount: route.farmersCount,
                        mapRoute: route.mapRoute
                    }
                    return apiCreateWorkRoute(request)
                })
                await Promise.all(routePromises)
            }

            // Success
            if (onSuccess) {
                onSuccess()
            }
            handleClose()
        } catch (error) {
            console.error('Error creating activity:', error)
            alert('Error al crear la actividad. Por favor intente de nuevo.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setCurrentStep(0)
        setWizardData({
            teamMembers: [],
            workRoutes: []
        })
        setCreatedActivityId(null)
        form.reset()
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Nueva Actividad</h2>
                    <p className="text-sm text-gray-500 mt-1">Complete los siguientes pasos para crear una actividad</p>
                </div>

                {/* Stepper */}
                <div className="px-6 py-6 border-b bg-gray-50">
                    <Steps current={currentStep} onChange={handleStepChange}>
                        {steps.map((step, index) => (
                            <Steps.Item
                                key={index}
                                title={step.title}
                                description={step.description}
                            />
                        ))}
                    </Steps>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {currentStep === 0 && (
                        <Step1CreateActivity
                            data={wizardData}
                            onUpdate={updateWizardData}
                        />
                    )}
                    {currentStep === 1 && (
                        <Step2AttachContent
                            activityType={wizardData.activityType || 'Survey'}
                            data={wizardData}
                            onUpdate={updateWizardData}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step3WorkZone
                            projectId={projectId!}
                            data={wizardData}
                            onUpdate={updateWizardData}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step4Team
                            projectId={projectId!}
                            data={wizardData}
                            onUpdate={updateWizardData}
                        />
                    )}
                    {currentStep === 4 && (
                        <Step5DelegateRoute
                            activityId={createdActivityId}
                            workZone={wizardData.workZone}
                            data={wizardData}
                            onUpdate={updateWizardData}
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
                    <Button
                        variant="plain"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <div className="flex gap-3">
                        {currentStep > 0 && (
                            <Button
                                variant="default"
                                onClick={handleBack}
                                icon={<FaArrowLeft />}
                                disabled={isSubmitting}
                            >
                                Anterior
                            </Button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <Button
                                variant="solid"
                                onClick={handleNext}
                                icon={<FaArrowRight />}
                                iconAlignment="end"
                            >
                                Siguiente
                            </Button>
                        ) : (
                            <Button
                                variant="solid"
                                onClick={handleSubmit}
                                icon={<FaCheck />}
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                Crear Actividad
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateActivityWizard
