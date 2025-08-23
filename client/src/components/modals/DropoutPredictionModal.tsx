import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Modal, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { DropoutPredictionResponseModel } from "api/repositories/studentManagement/model/dropoutPrediction/DropoutPredictionResponseModel";

const { Title, Text } = Typography;

interface IDropoutPredictionModal {
  open: boolean;
  onClose: () => void;
  results: Array<DropoutPredictionResponseModel>;
  loading?: boolean;
}

const DropoutPredictionModal: React.FC<IDropoutPredictionModal> = ({
  open,
  onClose,
  results,
  loading = false,
}) => {
  const columns: ColumnsType<DropoutPredictionResponseModel> = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: 120,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
    },
    {
      title: "Dropout Prediction",
      dataIndex: "dropoutPrediction",
      key: "dropoutPrediction",
      width: 150,
      align: "center",
      render: (prediction: number) => (
        <Tag
          color={prediction === 1 ? "red" : "green"}
          icon={
            prediction === 1 ? <CloseCircleOutlined /> : <CheckCircleOutlined />
          }
        >
          {prediction === 1 ? "High Risk" : "Low Risk"}
        </Tag>
      ),
    },
    {
      title: "Prediction Date",
      dataIndex: "predictionDate",
      key: "predictionDate",
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const getRiskSummary = () => {
    const highRisk = results.filter((r) => r.dropoutPrediction === 1).length;
    const lowRisk = results.filter((r) => r.dropoutPrediction === 0).length;
    const total = results.length;

    return {
      highRisk,
      lowRisk,
      total,
      highRiskPercentage: total > 0 ? ((highRisk / total) * 100).toFixed(1) : 0,
    };
  };

  const summary = getRiskSummary();

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span>Dropout Prediction Results</span>
        </div>
      }
      open={open}
      centered
      onCancel={onClose}
      footer={null}
      width={900}
      className="rounded-xl"
      styles={{
        body: {
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
          scrollbarWidth: "thin",
          overflowX: "hidden",
        },
        header: {
          padding: "10px 20px",
          borderBottom: "1px solid #f0f0f0",
          background: "#fff",
        },
      }}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-blue-600 text-sm font-medium">
              Total Students
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {summary.total}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-green-600 text-sm font-medium">Low Risk</div>
            <div className="text-2xl font-bold text-green-700">
              {summary.lowRisk}
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-red-600 text-sm font-medium">High Risk</div>
            <div className="text-2xl font-bold text-red-700">
              {summary.highRisk}
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-orange-600 text-sm font-medium">Risk Rate</div>
            <div className="text-2xl font-bold text-orange-700">
              {summary.highRiskPercentage}%
            </div>
          </div>
        </div>
        <div>
          <Title level={5} className="mb-3">
            Detailed Results
          </Title>
          <Table
            columns={columns}
            dataSource={results}
            rowKey="studentId"
            pagination={false}
            loading={loading}
            scroll={{ y: 300 }}
            size="small"
          />
        </div>

        {summary.highRisk > 0 && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <Title level={5} className="text-yellow-700 mb-2">
              ⚠️ Risk Analysis
            </Title>
            <Text className="text-yellow-700">
              {summary.highRisk} out of {summary.total} students (
              {summary.highRiskPercentage}%) are identified as high-risk for
              dropout. Consider implementing intervention strategies such as
              academic counseling, mentoring programs, or additional support
              services.
            </Text>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DropoutPredictionModal;
