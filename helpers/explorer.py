from PyQt5.QtWidgets import QFileDialog, QApplication
import sys

def write_to_file(directory: str) -> None:
    try:
        file = open("../helpers/explorer.txt", "w", encoding="utf-8")
        try:
            file.write(directory)
        except Exception as e:
            print(e)
        finally:
            file.close()
    except Exception as e:
        print(e)


def open_explorer() -> None:
    directory: str = QFileDialog.getExistingDirectory()
    try:
        file = open(directory)
        file.close()
    except:
        # print('Exception')
        sys.exit()
    finally:
        write_to_file(directory)
        sys.exit()


def open_directory(directory: str) -> None:
    directory = directory.replace('\\', '/')
    fname: str = QFileDialog.getOpenFileName(directory=directory)[0]
    try:
        file = open(fname)
        file.close()
    except FileNotFoundError:
        sys.exit()
    finally:
        # print(fname)
        sys.exit()



if __name__ == '__main__':
    app: QApplication = QApplication(sys.argv)
    if len(sys.argv) == 1:
        open_explorer()
    else:
        open_directory(sys.argv[1])
    sys.exit(app.exec_())