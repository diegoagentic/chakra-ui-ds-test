import { useState, useRef, useEffect } from 'react'
import {
    Box, Flex, VStack, HStack, Text, Input, Button, IconButton, Icon, useColorModeValue,
    List, ListItem, ListIcon, Divider, Badge, Heading, Spacer,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Textarea
} from '@chakra-ui/react'
import {
    FaPaperPlane, FaMagic, FaSync, FaFileAlt, FaExclamationTriangle,
    FaMicrochip, FaChevronLeft, FaCheckCircle, FaCalendar, FaClock, FaRocket, FaUpload, FaDownload, FaHistory, FaArchive, FaBriefcase,
    FaChevronDown, FaChevronUp, FaTimesCircle, FaSearch, FaUsers, FaChartBar, FaTerminal, FaExclamationCircle, FaPencilAlt, FaPaperclip
} from 'react-icons/fa'
import { Collapse } from '@chakra-ui/react'
import Navbar from './components/Navbar'

// --- Components ---

interface Order {
    id: string;
    client: string;
    amount: string;
    status: 'pending' | 'urgent';
    details: string;
}

const DiscrepancyResolutionFlow = () => {
    const [status, setStatus] = useState<'initial' | 'requesting' | 'pending' | 'approved'>('initial')
    const [requestText, setRequestText] = useState('')
    const bg = useColorModeValue('white', 'gray.800')
    const orangeColor = useColorModeValue('orange.600', 'orange.300')

    const handleRequest = () => {
        setStatus('pending')
        setTimeout(() => setStatus('approved'), 3000)
    }

    if (status === 'initial') {
        return (
            <VStack align="stretch" spacing={3}>
                <HStack spacing={2} color={orangeColor} fontWeight="bold">
                    <Icon as={FaExclamationTriangle} />
                    <Text>Found 3 discrepancies in recent shipments.</Text>
                </HStack>
                <VStack align="stretch" pl={6} spacing={1}>
                    <HStack spacing={2}>
                        <Icon as={FaExclamationTriangle} color="orange.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.500">Order #ORD-2054: Weight mismatch</Text>
                    </HStack>
                    <HStack spacing={2}>
                        <Icon as={FaExclamationTriangle} color="orange.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.500">Order #ORD-2051: Timestamp sync error</Text>
                    </HStack>
                    <HStack spacing={2}>
                        <Icon as={FaExclamationTriangle} color="orange.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.500">Order #ORD-2048: Missing carrier update</Text>
                    </HStack>
                </VStack>
                <HStack spacing={2} mt={1}>
                    <Button size="xs" variant="outline" colorScheme="blue" leftIcon={<FaSync />}>
                        Sync & Report
                    </Button>
                    <Button
                        size="xs" variant="outline"
                        leftIcon={<FaPencilAlt />}
                        onClick={() => setStatus('requesting')}
                    >
                        Request Changes
                    </Button>
                </HStack>
            </VStack>
        )
    }

    if (status === 'requesting') {
        return (
            <VStack align="stretch" spacing={3} className="animate-in fade-in slide-in-from-bottom-2">
                <Text fontSize="sm" fontWeight="medium">Describe required changes:</Text>
                <Textarea
                    placeholder="E.g., Update weight for ORD-2054 to 48kg..."
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    size="sm"
                    minH="80px"
                />
                <Flex justify="space-between" align="center">
                    <Button size="xs" variant="ghost" colorScheme="gray" leftIcon={<FaPaperclip />}>
                        Attach File
                    </Button>
                    <HStack spacing={2}>
                        <Button size="xs" variant="ghost" onClick={() => setStatus('initial')}>Cancel</Button>
                        <Button size="xs" colorScheme="blue" onClick={handleRequest}>Submit Request</Button>
                    </HStack>
                </Flex>
            </VStack>
        )
    }

    if (status === 'pending') {
        return (
            <VStack align="stretch" spacing={3} className="animate-in fade-in">
                <HStack spacing={2} color="blue.500">
                    <Icon as={FaSync} className="animate-spin" />
                    <Text>Requesting approval from Logistics Manager...</Text>
                </HStack>
            </VStack>
        )
    }

    if (status === 'approved') {
        return (
            <VStack align="stretch" spacing={3} className="animate-in fade-in">
                <HStack spacing={2} color="green.500" fontWeight="bold">
                    <Icon as={FaCheckCircle} />
                    <Text>Changes approved. PO updated.</Text>
                </HStack>
                <Box bg={useColorModeValue('gray.50', 'whiteAlpha.100')} p={3} borderRadius="md" borderWidth="1px">
                    <Flex justify="space-between" align="center">
                        <HStack spacing={3}>
                            <Flex w={8} h={8} bg="red.100" color="red.500" borderRadius="md" align="center" justify="center">
                                <Icon as={FaFileAlt} />
                            </Flex>
                            <Box>
                                <Text fontSize="sm" fontWeight="medium">PO_Revised_Final.pdf</Text>
                                <Text fontSize="xs" color="gray.500">Updated just now</Text>
                            </Box>
                        </HStack>
                        <Button size="xs" variant="ghost" colorScheme="blue">Download</Button>
                    </Flex>
                </Box>
            </VStack>
        )
    }
    return null
}

const PendingOrders = () => {
    const [orders, setOrders] = useState<Order[]>([
        { id: 'ORD-5001', client: 'Alpha Corp', amount: '$12,500', status: 'urgent', details: 'Requires immediate approval for expedited shipping due to stock delay.' },
        { id: 'ORD-5002', client: 'Beta Ltd', amount: '$4,200', status: 'pending', details: 'Standard restock. Verify discount application.' },
        { id: 'ORD-5003', client: 'Gamma Inc', amount: '$8,900', status: 'pending', details: 'New client account. Credit check passed.' },
    ])
    const [expanded, setExpanded] = useState<string | null>(null)
    const [processed, setProcessed] = useState<string[]>([])
    const bg = useColorModeValue('white', 'gray.800')
    const borderColor = useColorModeValue('gray.200', 'gray.700')

    const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id)

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setProcessed(prev => [...prev, id])
        console.log(`Order ${id} ${action}d`)
    }

    const activeOrders = orders.filter(o => !processed.includes(o.id))

    if (activeOrders.length === 0) {
        return (
            <Flex align="center" gap="2" color="green.500" bg="green.50" p="3" rounded="lg" borderWidth="1px" borderColor="green.200">
                <Icon as={FaCheckCircle} boxSize="5" />
                <Text fontWeight="medium">All pending orders processed!</Text>
            </Flex>
        )
    }

    return (
        <VStack spacing="2" w="full" maxW="450px" align="stretch">
            <Flex justify="space-between" mb="1">
                <Text fontSize="sm" fontWeight="semibold" color="gray.500">Pending Review ({activeOrders.length})</Text>
            </Flex>
            {activeOrders.map(order => (
                <Box key={order.id} borderWidth="1px" borderColor={borderColor} borderRadius="lg" bg={bg} overflow="hidden" shadow="sm">
                    <Flex
                        as="button"
                        w="full" align="center" justify="space-between" p="3"
                        _hover={{ bg: useColorModeValue('gray.50', 'whiteAlpha.100') }}
                        onClick={() => toggleExpand(order.id)}
                    >
                        <HStack spacing="3">
                            <Badge colorScheme={order.status === 'urgent' ? 'red' : 'gray'}>{order.status}</Badge>
                            <Box textAlign="left">
                                <Text fontSize="sm" fontWeight="medium">{order.id} - {order.client}</Text>
                                <Text fontSize="xs" color="gray.500">{order.amount}</Text>
                            </Box>
                        </HStack>
                        <Icon as={expanded === order.id ? FaChevronUp : FaChevronDown} color="gray.400" />
                    </Flex>

                    <Collapse in={expanded === order.id} animateOpacity>
                        <Box p="3" bg={useColorModeValue('gray.50', 'whiteAlpha.50')} borderTopWidth="1px" borderColor={borderColor}>
                            <Text fontSize="sm" mb="3">{order.details}</Text>
                            <HStack justify="flex-end" spacing="2">
                                <Button
                                    size="xs" variant="outline" colorScheme="red"
                                    leftIcon={<FaTimesCircle />}
                                    onClick={() => handleAction(order.id, 'reject')}
                                >
                                    Request Changes
                                </Button>
                                <Button
                                    size="xs" colorScheme="green"
                                    leftIcon={<FaCheckCircle />}
                                    onClick={() => handleAction(order.id, 'approve')}
                                >
                                    Approve
                                </Button>
                            </HStack>
                        </Box>
                    </Collapse>
                </Box>
            ))}
        </VStack>
    )
}

// @ts-ignore
function ReportCard() {
    const bg = useColorModeValue('white', 'whiteAlpha.100')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')
    return (
        <Flex
            mt="3" p="3" w="full" bg={bg}
            borderWidth="1px" borderColor={borderColor} borderRadius="lg"
            align="center" justify="space-between"
            cursor="pointer" _hover={{ borderColor: 'blue.400' }}
        >
            <Flex align="center" gap="3">
                <Flex w="10" h="10" rounded="lg" bg="red.100" color="red.500" align="center" justify="center">
                    <Icon as={FaFileAlt} boxSize="5" />
                </Flex>
                <Box>
                    <Text fontWeight="medium" fontSize="sm">Reconciliation_Report.pdf</Text>
                    <Text fontSize="xs" color="gray.500">1.2 MB • Generated just now</Text>
                </Box>
            </Flex>
            <Button size="xs" variant="ghost" colorScheme="blue" leftIcon={<FaDownload />}>Download</Button>
        </Flex>
    )
}

interface WorkspaceProps {
    onBack: () => void;
    onLogout: () => void;
    onNavigateToWorkspace: () => void;
}

export default function Workspace({ onBack, onLogout, onNavigateToWorkspace }: WorkspaceProps) {
    const [activeTab, setActiveTab] = useState('board')
    const [searchQuery, setSearchQuery] = useState('')
    // State
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm your AI Copilot. I can help you analyze orders, sync data, or generate reports based on your preferences. How can I assist you today?",
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Activity Log State
    const [appActivities, setAppActivities] = useState([
        { id: 1, app: 'Inventory', text: "Assets updated in Inventory App (Order #ORD-2054)", time: "10:45 AM", icon: FaArchive },
        { id: 2, app: 'Analytics', text: "Data extracted for Analytics Report", time: "10:15 AM", icon: FaChartBar },
        { id: 3, app: 'CRM', text: "Client record updated 'TechDealer'", time: "09:30 AM", icon: FaUsers },
        { id: 4, app: 'Analytics', text: "Report created from Analytics", time: "09:00 AM", icon: FaFileAlt },
    ])

    const [systemLogs, setSystemLogs] = useState([
        { id: 1, text: "System check completed", time: "09:00 AM", type: "system" },
        { id: 2, text: "Inventory data synced", time: "10:15 AM", type: "success" },
        { id: 3, text: "User 'Sarah' logged in", time: "10:30 AM", type: "info" },
    ])

    const [isLogsOpen, setIsLogsOpen] = useState(false)

    // Styling
    const bg = useColorModeValue('gray.50', 'gray.900')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')
    const chatUserBg = useColorModeValue('blue.500', 'blue.500')
    const chatBotBg = useColorModeValue('white', 'gray.800')
    const toolbarBg = useColorModeValue('whiteAlpha.800', 'blackAlpha.600')
    const sidebarBg = useColorModeValue('white', 'gray.900')

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    // Handlers
    const addSystemLog = (text: string, type: 'info' | 'success' | 'warning' | 'error' | 'system' = 'info') => {
        const newLog = {
            id: Date.now(),
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type
        }
        setSystemLogs(prev => [newLog, ...prev])
    }

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return

        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        }

        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setInputValue('')
        setIsTyping(true)

        const lowerText = text.toLowerCase()

        if (lowerText.includes('discrep') || lowerText.includes('sync')) {
            simulateDiscrepancyFlow()
        } else if (lowerText.includes('summarize') || lowerText.includes('activity')) {
            simulateSummaryFlow()
        } else if (lowerText.includes('pending') || lowerText.includes('urgent')) {
            simulatePendingOrdersFlow()
        } else {
            setTimeout(() => {
                const responseMsg = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: "I'm tuned to help with specific operational tasks right now. Try asking me to analyze order discrepancies or summarize recent activity.",
                    timestamp: new Date()
                }
                // @ts-ignore
                setMessages(prev => [...prev, responseMsg])
                setIsTyping(false)
            }, 1000)
        }
    }

    const simulatePendingOrdersFlow = () => {
        addSystemLog("Retrieving pending orders", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: `pending-${Date.now()}`,
                role: 'assistant',
                content: <PendingOrders />,
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 1200)
    }

    const simulateDiscrepancyFlow = () => {
        addSystemLog("Started discrepancy analysis", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'step-1',
                role: 'assistant',
                content: (
                    <Flex align="center" gap="2">
                        <Icon as={FaSync} className="animate-spin" />
                        <Text>Scanning recent orders for "TechDealer Solutions"...</Text>
                        <style>{`
                            @keyframes spin { 100% { transform: rotate(360deg); } }
                            .animate-spin { animation: spin 1s linear infinite; }
                         `}</style>
                    </Flex>
                ),
                timestamp: new Date()
            }])
        }, 1500)

        setTimeout(() => {
            addSystemLog("Found 3 discrepancies", "warning")
            setTimeout(() => {
                // @ts-ignore
                setMessages(prev => [...prev, {
                    id: 'step-2',
                    role: 'assistant',
                    content: <DiscrepancyResolutionFlow />,
                    timestamp: new Date()
                }])
            }, 1500)
        }, 3500)
    }

    const simulateSummaryFlow = () => {
        addSystemLog("Started activity summary", "system")
        setTimeout(() => {
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'summary-step-1',
                role: 'assistant',
                content: (
                    <Flex align="center" gap="2">
                        <Icon as={FaMagic} color="blue.400" className="animate-pulse" />
                        <Text>Analyzing recent activity for "TechDealer Solutions"...</Text>
                    </Flex>
                ),
                timestamp: new Date()
            }])
        }, 1500)

        setTimeout(() => {
            addSystemLog("Analysis complete: 3 orders found", "success")
            // @ts-ignore
            setMessages(prev => {
                return [...prev, {
                    id: 'summary-step-2',
                    role: 'assistant',
                    content: (
                        <Flex direction="column" gap="3">
                            <Flex align="center" gap="2">
                                <Icon as={FaFileAlt} />
                                <Text fontWeight="bold">Analysis Complete. Found 3 orders under $1M.</Text>
                            </Flex>
                            <Box pl="4">
                                <Flex direction="column" gap="1" fontSize="sm" color="gray.500">
                                    <Flex align="center" gap="2">
                                        <Icon as={FaExclamationTriangle} color="orange.400" />
                                        <Text>Order #ORD-2054: $850k - <Text as="span" color="orange.500" fontWeight="bold">Missing Logistics Provider</Text></Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Icon as={FaClock} />
                                        <Text>Order #ORD-2051: $420k - In Transit</Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Icon as={FaCheckCircle} color="green.500" />
                                        <Text>Order #ORD-2048: $120k - Delivered</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                            <Text>Order #ORD-2054 needs immediate attention. Shall I assign the default logistics provider and dispatch?</Text>
                        </Flex>
                    ),
                    timestamp: new Date()
                }]
            })
        }, 3500)
    }

    const handleSyncAndReport = () => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: "Yes, sync them and generate the report.",
            timestamp: new Date()
        }
        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setIsTyping(true)
        addSystemLog("Initiated DB Sync", "info")

        setTimeout(() => {
            addSystemLog("Report generated", "success")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'step-3',
                role: 'assistant',
                content: (
                    <Flex direction="column" gap="3" w="full">
                        <Flex align="center" gap="2" color="green.500">
                            <Icon as={FaCheckCircle} />
                            <Text>Syncing 3 records to Central DB... Done.</Text>
                        </Flex>
                        <Flex align="center" gap="2" color="blue.500">
                            <Icon as={FaFileAlt} />
                            <Text>Generating Reconciliation Report... Done.</Text>
                        </Flex>
                        <ReportCard />
                    </Flex>
                ),
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 3000)
    }

    const handleAssignAndDispatch = () => {
        const newUserMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: "Assign provider and dispatch.",
            timestamp: new Date()
        }
        // @ts-ignore
        setMessages(prev => [...prev, newUserMsg])
        setIsTyping(true)
        addSystemLog("Dispatch sequence started", "info")

        setTimeout(() => {
            addSystemLog("Logistics provider assigned", "success")
            // @ts-ignore
            setMessages(prev => [...prev, {
                id: 'summary-step-3',
                role: 'assistant',
                content: (
                    <Flex direction="column" gap="3" w="full">
                        <Flex align="center" gap="2" color="green.500">
                            <Icon as={FaRocket} />
                            <Text>Logistics Provider "FastTrack" assigned.</Text>
                        </Flex>
                        <Flex align="center" gap="2" color="blue.500">
                            <Icon as={FaPaperPlane} />
                            <Text>Dispatch signal sent to warehouse. Order is now processing.</Text>
                        </Flex>
                    </Flex>
                ),
                timestamp: new Date()
            }])
            setIsTyping(false)
        }, 3000)
    }

    return (
        <Flex direction="column" h="100vh" overflow="hidden" bg={bg}>
            <Modal isOpen={isLogsOpen} onClose={() => setIsLogsOpen(false)} size="lg" scrollBehavior="inside">
                <ModalOverlay backdropFilter="blur(5px)" bg="blackAlpha.300" />
                <ModalContent borderRadius="xl" bg={useColorModeValue('white', 'gray.900')} borderColor={borderColor} borderWidth="1px">
                    <ModalHeader fontSize="lg" fontWeight="bold" display="flex" alignItems="center" gap="2">
                        <Icon as={FaTerminal} color="gray.500" /> System Logs
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py="4">
                        <VStack spacing="3" align="stretch">
                            {systemLogs.map((log) => (
                                <Flex key={log.id} gap="3" align="start" p="2" rounded="md" _hover={{ bg: useColorModeValue('gray.50', 'whiteAlpha.50') }}>
                                    <Box mt="1.5" boxSize="2" rounded="full" flexShrink={0}
                                        bg={log.type === 'success' ? 'green.400' : log.type === 'warning' ? 'orange.400' : log.type === 'error' ? 'red.500' : 'blue.500'}
                                    />
                                    <Box flex="1">
                                        <Text fontSize="xs" fontWeight="mono" color={useColorModeValue('gray.700', 'gray.200')}>{log.text}</Text>
                                        <Text fontSize="10px" color="gray.500">{log.time}</Text>
                                    </Box>
                                </Flex>
                            ))}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" onClick={() => setIsLogsOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Navbar onLogout={onLogout} activeTab="Overview" onNavigateToWorkspace={onNavigateToWorkspace} />

            {/* Main Content Container - shifted down for navbar */}
            <Flex direction="column" flex="1" pt="72px">

                {/* Horizontal Quick Actions Panel & Status */}
                {/* Horizontal Quick Actions Panel & Status */}
                <Flex
                    align="center" justify="space-between" px="6" py="3"
                    bg={toolbarBg} backdropFilter="blur(10px)" borderBottom="1px" borderColor={borderColor} zIndex="10"
                >
                    <HStack spacing="4">
                        <IconButton aria-label="Back" icon={<FaChevronLeft />} variant="ghost" onClick={onBack} size="sm" />
                        <Flex align="center" gap="2">
                            <Icon as={FaBriefcase} color="blue.500" />
                            <Heading size="sm" fontWeight="bold">My Work Space</Heading>
                        </Flex>
                    </HStack>

                    <HStack spacing="6">
                        {/* Frequent Actions */}
                        <HStack spacing="3">
                            <Text fontSize="xs" fontWeight="medium" color="gray.500" display={{ base: 'none', lg: 'block' }}>Frequent Actions:</Text>
                            <HStack spacing="1">
                                <Button
                                    leftIcon={<FaExclamationTriangle />} variant="ghost" size="sm" fontSize="xs" colorScheme="gray"
                                    onClick={() => handleSendMessage("Analyze orders for TechDealer Solutions with discrepancies")}
                                >
                                    <Text display={{ base: 'none', sm: 'block' }}>Analyze</Text>
                                </Button>
                                <Button
                                    leftIcon={<FaMagic />} variant="ghost" size="sm" fontSize="xs" colorScheme="gray"
                                    onClick={() => handleSendMessage("Summarize recent activity")}
                                >
                                    <Text display={{ base: 'none', sm: 'block' }}>Summarize</Text>
                                </Button>
                                <Button
                                    leftIcon={<FaArchive />} variant="ghost" size="sm" fontSize="xs" colorScheme="gray"
                                    onClick={() => handleSendMessage("Check inventory levels")}
                                >
                                    <Text display={{ base: 'none', sm: 'block' }}>Inventory</Text>
                                </Button>
                            </HStack>
                        </HStack>

                        <Divider orientation="vertical" h="6" borderColor="gray.300" display={{ base: 'none', sm: 'block' }} />

                        {/* Status Buttons */}
                        <HStack spacing="3">
                            <Button
                                size="sm" fontSize="xs" colorScheme="orange" variant="solid"
                                onClick={() => handleSendMessage("Show pending orders")}
                                leftIcon={<FaExclamationCircle />}
                            >
                                3 Pending
                            </Button>
                            <Button
                                size="sm" fontSize="xs" colorScheme="red" variant="solid"
                                onClick={() => handleSendMessage("Show pending orders")}
                                leftIcon={<FaExclamationTriangle />}
                            >
                                1 Urgent
                            </Button>
                            <Divider orientation="vertical" h="6" borderColor="gray.300" mx="2" />
                            <IconButton
                                aria-label="System Logs"
                                icon={<FaTerminal />}
                                variant="ghost"
                                colorScheme="gray"
                                size="sm"
                                onClick={() => setIsLogsOpen(true)}
                                title="System Logs"
                            />
                        </HStack>
                    </HStack>
                </Flex>

                <Flex flex="1" overflow="hidden">
                    {/* Activity Sidebar (Left) */}
                    <Flex direction="column" w="280px" borderRight="1px" borderColor={borderColor} bg={sidebarBg} display={{ base: 'none', md: 'flex' }}>
                        <Flex p="4" borderBottom="1px" borderColor={borderColor} align="center" gap="2">
                            <Icon as={FaHistory} color="gray.400" />
                            <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                                Recent Activity
                            </Text>
                        </Flex>
                        <Box flex="1" overflowY="auto" p="4">
                            <VStack spacing="4" align="stretch">
                                {appActivities.map((activity, i) => (
                                    <Box key={activity.id} p="3" borderRadius="md" _hover={{ bg: useColorModeValue('gray.50', 'whiteAlpha.50') }} transition="background 0.2s">
                                        <Flex align="center" gap="3" mb="1">
                                            <Flex p="1" rounded="md" bg={useColorModeValue('blue.50', 'whiteAlpha.200')} color={useColorModeValue('blue.500', 'blue.200')}>
                                                <Icon as={activity.icon} boxSize="3" />
                                            </Flex>
                                            <Text fontSize="10px" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="wider">
                                                {activity.app}
                                            </Text>
                                        </Flex>
                                        <Text fontSize="sm" fontWeight="medium" noOfLines={2} lineHeight="short">{activity.text}</Text>
                                        <Text fontSize="xs" color="gray.400" mt="1" fontFamily="mono">{activity.time}</Text>
                                    </Box>
                                ))}
                            </VStack>
                        </Box>
                    </Flex>

                    {/* Chat Area */}
                    <Flex direction="column" flex="1" position="relative">
                        {/* Messages */}
                        <Box flex="1" overflowY="auto" p="6">
                            <VStack spacing="4" align="stretch" pb="4">
                                {messages.map((msg) => (
                                    <Flex key={msg.id} justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
                                        <Box
                                            maxW={{ base: '85%', md: '70%' }}
                                            p="4"
                                            bg={msg.role === 'user' ? chatUserBg : chatBotBg}
                                            color={msg.role === 'user' ? 'white' : 'inherit'}
                                            borderRadius="xl"
                                            borderBottomRightRadius={msg.role === 'user' ? 'sm' : 'xl'}
                                            borderBottomLeftRadius={msg.role === 'assistant' ? 'sm' : 'xl'}
                                            boxShadow="sm"
                                            borderWidth={msg.role === 'assistant' ? '1px' : '0'}
                                            borderColor={borderColor}
                                        >
                                            {msg.role === 'assistant' && (
                                                <Flex align="center" gap="2" mb="2" color="blue.500">
                                                    <Icon as={FaMagic} />
                                                    <Text fontSize="xs" fontWeight="bold">AI Copilot</Text>
                                                </Flex>
                                            )}
                                            <Box fontSize="sm" whiteSpace="pre-wrap">
                                                {typeof msg.content === 'string' ? <Text>{msg.content}</Text> : msg.content}
                                            </Box>

                                            {/* Action Buttons for specific messages */}
                                            {/* @ts-ignore */}
                                            {msg.role === 'assistant' && msg.id === 'step-2' && (
                                                <Button size="xs" mt="3" colorScheme="blue" onClick={handleSyncAndReport} leftIcon={<FaSync />}>
                                                    Sync & Report
                                                </Button>
                                            )}
                                            {/* @ts-ignore */}
                                            {msg.role === 'assistant' && msg.id === 'summary-step-2' && (
                                                <Button size="xs" mt="3" colorScheme="blue" onClick={handleAssignAndDispatch} leftIcon={<FaRocket />}>
                                                    Assign & Execute
                                                </Button>
                                            )}
                                        </Box>
                                    </Flex>
                                ))}
                                {isTyping && (
                                    <Flex justify="flex-start">
                                        <Box bg={chatBotBg} p="3" borderRadius="xl" borderBottomLeftRadius="sm" borderWidth="1px" borderColor={borderColor}>
                                            <Flex gap="1">
                                                <Box w="2" h="2" bg="gray.400" rounded="full" className="animate-bounce" />
                                                <Box w="2" h="2" bg="gray.400" rounded="full" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                <Box w="2" h="2" bg="gray.400" rounded="full" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            </Flex>
                                        </Box>
                                    </Flex>
                                )}
                                <div ref={messagesEndRef} />
                            </VStack>
                        </Box>

                        {/* Input Area */}
                        <Box p="4" bg={toolbarBg} backdropFilter="blur(10px)" borderTop="1px" borderColor={borderColor}>
                            <Flex maxW="800px" mx="auto" position="relative">
                                <Input
                                    placeholder="Ask copilot..."
                                    rounded="full" bg={useColorModeValue('white', 'whiteAlpha.100')}
                                    h="12" pl="12" pr="12"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                    focusBorderColor="blue.500"
                                />
                                <Box position="absolute" left="4" top="3.5" color="gray.400">
                                    <Icon as={FaMagic} />
                                </Box>
                                <IconButton
                                    aria-label="Send"
                                    icon={<FaPaperPlane />}
                                    position="absolute" right="1" top="1"
                                    rounded="full" size="md" variant="ghost" colorScheme="blue"
                                    onClick={() => handleSendMessage(inputValue)}
                                    isDisabled={!inputValue.trim()}
                                    opacity={inputValue.trim() ? 1 : 0.5}
                                />
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
